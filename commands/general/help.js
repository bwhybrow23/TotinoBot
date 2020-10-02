const Discord = require("discord.js");

module.exports = {
    name: "help",
    category: "general",
    description: "Returns all commands, or information about one specific command.",
    usage: "^help <CATEGORY | COMMAND>",
    run: async (bot, message, args) => {

        //Capitalize function
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        if (bot.categories.includes(args[0])) {

            //Category specific help

            let category = args[0]

            //Get Command List for Category Provided
            const commandSum = bot.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `- \`${cmd.usage}\` - ${cmd.description}`)
                .join("\n");

            //Embed to Send
            const embed = new Discord.MessageEmbed()
                .setColor(bot.settings.color.blue)
                .setTitle(capitalize(args[0]))
                .setDescription(commandSum)
                .setFooter(`Help Command | Syntax: <> = required, [] = optional`, bot.user.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);

        } else if (!args[0]) {

            let prefix = bot.settings.prefix;

            //Main Embed
            let embed = new Discord.MessageEmbed()
                .setTitle("All Commands")
                .setDescription(`Prefix: \`${prefix}\``)
                .setColor(bot.settings.color.blue)
                .addField(`Bot Commands`, `\`${prefix}help bot\``, true)
                .addField(`Fun Commands`, `\`${prefix}help fun\``, true)
                .addField(`General Commands`, `\`${prefix}help general\``, true)
                .setFooter("Help Command", bot.user.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);


        } else if (bot.commands.filter(cmd => cmd.name === args[0])) {

            //Command Specific Help

            const embed = new Discord.MessageEmbed()

            let input = args[0];

            // Get the cmd by the name or alias
            const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

            let info = `No information found for command **${input.toLowerCase()}**`;

            // If no cmd is found, send not found embed
            if (!cmd) {
                return message.channel.send(embed.setColor("RED").setDescription(info));
            }

            // Add all cmd info to the embed
            if (cmd.name) info = `**Command name**: ${capitalize(cmd.name)}`;
            if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
            if (cmd.description) info += `\n**Description**: ${cmd.description}`;
            if (cmd.usage) {
                info += `\n**Usage**: \`${cmd.usage}\``;
                embed.setFooter(`Help Command | Syntax: <> = required, [] = optional`);
            }
            if (cmd.example) info += `\n**Example**: ${cmd.example}`;

            return message.channel.send(embed.setColor(bot.settings.color.blue).setDescription(info).setTimestamp());
        }

    }
}