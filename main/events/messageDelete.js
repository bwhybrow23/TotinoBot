const Discord = require("discord.js");

module.exports = async (bot, message) => {

    if (message.author.bot) return;

    const logs = await bot.channels.resolve(bot.settings.channels.log);
  
    let deleteMSGEmbed = new Discord.MessageEmbed()
    .setColor("#ff00e1")
    .setThumbnail(message.author.displayAvatarURL())
    .setAuthor(message.author.tag)
    .setDescription(`**Message Deleted in <#${message.channel.id}>**`)
    .addField("Message:", message.content)
    .setFooter("Message Deleted | Powered by Totino Rolls", bot.user.displayAvatarURL())
    .setTimestamp();
  
    logs.send(deleteMSGEmbed);

};