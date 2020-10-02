module.exports = {
    name: "petition",
    category: "general",
    description: "Create a petition for <#760962271882248232>",
    usage: "^petition <text>",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let helpE = new Discord.MessageEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle("Command: Petition")
    .addField("Description:", "Create a petition for <#760962271882248232>", true)
    .addField("Usage", "`^petition <text>`", true)
    .addField("Example", "`^petition Make Ben owner cuz he's better than Totino.`")
    .setFooter(message.author.tag, message.author.avatarURL())
    .setTimestamp();

    if (!args[0]) return message.channel.send(helpE);

    let petitionText = args.join(" ");

    const petitionEmbed = new Discord.MessageEmbed()
        .setColor(bot.settings.color.yellow)
        .setTitle("New Petition")
        .addField("Petition for:", petitionText)
        .addField("By", message.author.tag)
        .setFooter(message.author.tag, message.author.displayAvatarURL());

    let petitionChannel = message.guild.channels.cache.find(c => c.id === "760962271882248232");

    petitionChannel.send(petitionEmbed).then((message) => {
        message.react("✅");
        message.react("❌");
    });

    message.reply("Petition sent in <#760962271882248232>")

}};
