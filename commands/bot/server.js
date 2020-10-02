const Discord = require("discord.js");

module.exports = {
    name: "server",
    category: "bot",
    description: "Gain information about the server the command is ran in.",
    usage: "^server",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    let sicon = message.guild.iconURL;
   
    let channelcount = message.guild.channels.cache.size;
    let gcreated = message.guild.createdAt;
    let gid = message.guild.id;
    let totalmembers = message.guild.memberCount;
    let gname = message.guild.name;
    let roles = await message.guild.roles.fetch();
    let rolecount = roles.cache.size;

    const serverEmbed = new Discord.MessageEmbed()
        .setColor(bot.settings.color.green)
        .setThumbnail(sicon)
        .setDescription('**' + gname + ' Information**\n\nGuild Id **' + gid + '**\nGuild Channels: **' + channelcount + '**\nCreated: **' + gcreated + '**\nTotal Members: **' + totalmembers + '**\nTotal Roles: **' + rolecount + '**')
        .setFooter("Server Command | Powered by Totino Rolls", bot.user.displayAvatarURL())
        .setTimestamp();

    message.channel.send(serverEmbed);
   
   }};
