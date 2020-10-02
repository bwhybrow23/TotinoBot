const Discord = require("discord.js");

module.exports = async (bot, member) => {

    //CONSOLE LOG IT
    // console.log(`${member.id} left the server.`);

    //FIND LEAVE CHANNEL
    let leaveChannel = await bot.channels.resolve(bot.settings.channels.leave)
    if (!leaveChannel) return console.log("Could not log a member leaving as the server doesn't have a log channel!");

    //LEAVE EMBED
    let leaveEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`${member.user.username} has left the land of Totinos! Cya around!`)
        .setFooter("User Left | Powered by Totino Rolls", bot.user.displayAvatarURL())
        .setTimestamp();

    //SEND LEAVE EMBED
    leaveChannel.send(leaveEmbed);

    //Update Status
    bot.guilds.fetch('747469370002767913').then(guild => {
        bot.user.setPresence({
            activity: {
                name: `all ${guild.members.cache.filter(member => !member.user.bot).size} of my Totinos.`,
                type: 'WATCHING'
            }
        });
    });

    //UPDATE CHANNEL NAME WITH NEW MEMBER COUNT
    member.guild.channels.cache.find(c => c.id === "761014210615836704").setName(`Member Count: ${member.guild.members.cache.filter(member => !member.user.bot).size}`);

}