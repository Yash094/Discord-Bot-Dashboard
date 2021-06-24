const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../botconfig/embed.json");

module.exports = {
  name: "wanted",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "wanted @User",

  run: async (client, message) => {

    var tempmsg = await message.channel.send("<a:loading:856385452868763688>")

    var user = message.mentions.users.first() || message.author;
    var avatar = user.displayAvatarURL({ format: "png" });

    client.memer.wanted(avatar).then(image => {

      var attachment = new MessageAttachment(image, "wanted.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://wanted.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}