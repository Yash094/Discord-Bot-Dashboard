const Discord = require("discord.js");
const GuildSettings = require("../../models/settings");const mongoose = require("mongoose");

module.exports = {
  name: "setlogchannel",
  description: "set a log channel",
  category: "basic",
  usage: "setchannel $channelname",
  run: async (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel
        .send("You do not have permission to use this command.")
        .then(m => m.delete({ timeout: 5000 }));

    const channel = await message.mentions.channels.first();

    if (!channel)
      return message.channel
        .send(
          "I cannot find that channel. Please mention a channel within this server."
        )
        .then(m => m.delete({ timeout: 5000 }));
    await GuildSettings.findOne(
      {
        gid: message.guild.id
      },
      async (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new GuildSettings({
            gid: message.guild.id,
            prefix: '!!',
            logchn: channel.id
          });

          await newGuild
            .save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

          return message.channel.send(
            `The log channel has been set to ${channel}`
          );
        } else {
          guild
            .updateOne({
              logchn: channel.id
            })
            .then(result => console.log(result))
            .catch(err => console.error(err));

          return message.channel.send(
            `The log channel has been set to ${channel}`
          );
        }
      }
    );
  }
};
