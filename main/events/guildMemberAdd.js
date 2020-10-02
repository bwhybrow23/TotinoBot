const Discord = require("discord.js");

module.exports = async (bot, member) => {

    //CONSOLE LOG IT
    // console.log(`${member.id} has joined the server.`);

    //FIND THE WELCOME CHANNEL
    let welcomeChannel = await bot.channels.resolve(bot.settings.channels.welcome);
    if (!welcomeChannel) return console.log("Could not log a member joining as the server doesn't have a log channel!");

    //WELCOME EMBED
    let welcomeEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Welcome ${member} to ${member.guild.name}! \nEnjoy your time in this amazing server.`)
        .setFooter("User Joined | Powered by Totino Rolls", bot.user.displayAvatarURL())
        .setTimestamp();

    //SEND THAT WELCOME EMBED TO THE WELCOME CHANNEL
    welcomeChannel.send(welcomeEmbed);

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

    //ADD ROLE(S) TO USER
    let memberRole = member.guild.roles.cache.get("760975576570920961");
    member.roles.add(memberRole).catch(console.error);

}