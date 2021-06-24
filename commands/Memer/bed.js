const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../botconfig/embed.json");

module.exports = {
  name: "bed",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "affect @User @User2",

  run: async (client, message) => {

    var user1 = message.mentions.users.first();

    if (!user1) return message.channel.send(new MessageEmbed().setColor("#ff595e")
    .setDescription("**<:x2:819613332892942347> Please mention a user!**"))

    var tempmsg = await message.channel.send("<a:loading:856385452868763688>")

    var user2 = message.mentions.users.last() || message.author;
    if(user2.id == user1.id) user2 = message.author;

    if(user2.id == user1.id) {
      tempmsg.delete()
      
      return message.channel.send(new MessageEmbed().setColor("#ff595e")
      .setDescription("**<:x2:819613332892942347> Please mention a user!**"))
    }

    var avatar1 = user1.displayAvatarURL({ format: "png" });
    var avatar2 = user2.displayAvatarURL({ format: "png" });

    client.memer.bed(avatar1, avatar2).then(image => {

      var attachment = new MessageAttachment(image, "bed.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://bed.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}
