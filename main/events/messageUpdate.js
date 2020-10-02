const Discord = require("discord.js");

module.exports = async (bot, oldMessage, newMessage) => {

    if (oldMessage.author.bot || newMessage.author.bot) return;
    if (!oldMessage || !newMessage) return;

    const logs = await bot.channels.resolve(bot.settings.channels.log);

    let editMSGEmbed = new Discord.MessageEmbed()
        .setColor("#ff00e1")
        .setThumbnail(oldMessage.author.displayAvatarURL())
        .setAuthor(oldMessage.author.tag)
        .setDescription(`**Message Edited in <#${newMessage.channel.id}>**`)
        .addField("Before:", oldMessage.content)
        .addField("After:", newMessage.content)
        .setFooter("Message Edited | Powered by Totino Rolls", bot.user.displayAvatarURL())
        .setTimestamp();

    if(newMessage.content === oldMessage.content) {
        return
    } else {
    logs.send(editMSGEmbed);
    };

};