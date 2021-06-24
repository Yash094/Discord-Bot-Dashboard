const Meme = require("memer-api");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config");
const GuildSettings = require("./models/settings");
const Dashboard = require("./dashboard/dashboard");
const client = new Discord.Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_MESSAGES"
    ]
  }
})
require('discord-buttons')(client);
client.memer = new Meme(config.MEMER_API_TOKEN)
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.config = config;
require("./logger")(client);

// We listen for client's ready event.
client.on("ready", async () => {
  console.log("Fetching members...");

  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }

  console.log("Fetched members.");

  console.log(`Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
  Dashboard(client);
  client.user.setActivity('BOT BY YASH | GITHUB - https://github.com/Yash094/Discord-Dashboard-Bot', ({ type: "WATCHING" }))
});



client.on("message", async message => {
  const guilddb = await GuildSettings.findOne(
    {
      gid: message.guild.id
    },
    (err, guild) => {
      if (err) console.error(err);
    }
  );

  if (guilddb) {
    let prefix;
    if (!guilddb.prefix) {
      prefix = '!!'
    } else {
      prefix = guilddb.prefix;
    }
    if (message.mentions.has('@everyone')) {
      return
    }
    if (message.mentions.has(client.user.id)) {
      message.channel.send(`${prefix} is my prefix for this server`)
    }
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));


    if (command) command.run(client, message, args);
  }

  if (!guilddb) {
    let prefix = "!!";
    if (message.mentions.has('@everyone')) {
      return
    }
    if (message.mentions.has(client.user.id)) {
      message.channel.send(`${prefix} is my prefix for this server`)
    }
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
  }
});

// Listening for error & warn events.
client.on("error", console.error);
client.on("warn", console.warn);

// We login into the bot.
client.login(config.token);
