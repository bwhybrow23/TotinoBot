const Discord = require("discord.js");

module.exports = {
    name: "about",
    category: "bot",
    description: "Gives all the information about the bot.",
    usage: "^about",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    //const settings = require('/home/stentorian/DeadBot/main/settings.json');

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    let aboutEmbed = new Discord.MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.settings.color.blue)
        .setTitle('Bot Information')
        .addField('Bot Name', bot.user.tag)
        .addField('Created By', '[Stentorian#9524](https://benwhybrow.com)')
        .addField('Created On', bot.user.createdAt)
        .addField('Made For', "[TotinoKing](https://tiktok.com/@totinoking)")
        .setFooter(`About Command | Powered by Totino Rolls`, bot.user.displayAvatarURL())
        .setTimestamp();

    message.channel.send(aboutEmbed);

}};
