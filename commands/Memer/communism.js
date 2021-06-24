const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../botconfig/embed.json");

module.exports = {
  name: "communism",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "communism @User",

  run: async (client, message) => {

    var tempmsg = await message.channel.send("<a:loading:856385452868763688>")

    var user = message.mentions.users.first() || message.author;
    var avatar = user.displayAvatarURL({ format: "png" });

    client.memer.communism(avatar).then(image => {

      var attachment = new MessageAttachment(image, "communism.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://communism.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}