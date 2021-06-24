const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "basic",
  run: async (client, message, args) => {

    function buttons() {
      let button = new MessageButton()
        .setLabel('Dashboard')
        .setStyle('url')
        .setEmoji('857596154871021568')
        .setURL('https://yashirobot.cf')

      let button2 = new MessageButton()
        .setLabel('Invite')
        .setStyle('url')
        .setEmoji('❔')
        .setURL(`https://discord.com/oauth2/authorize?client_id=857324947398590496&permissions=8&scope=bot`)

      let button3 = new MessageButton()
        .setLabel('Support Server')
        .setStyle('url')
        .setEmoji('❔')
        .setURL('https://discord.gg/emD44ZJaSA')

      let buttonRow = new MessageActionRow()
        .addComponent(button2)
        .addComponent(button3)
        .addComponent(button)



      return buttonRow
    }
    var row = buttons()

    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("Run <prefix>help <command name>")
        .setTitle("HELP MENU 🔰 Commands")
        .addField("• Developer", `\`\`\`Name:Yash#0001 [488225580156715008]\`\`\``)
        .addField("• Important Links", `**[Invite Link](https://discord.com/oauth2/authorize?client_id=857324947398590496&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/emD44ZJaSA)\`|\`[Dashboard](https:/yashirobot.cf)\**`)
        .setColor("WHITE")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("` | `") + "`";

        emx.addField(`${category.toUpperCase()}`, desc);
      }

      return message.channel.send({ component: row, embed: emx });
    }
  }
};
