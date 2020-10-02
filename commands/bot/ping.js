const Discord = require("discord.js");

module.exports = {
    name: "ping",
    category: "bot",
    description: "Find out about all information related to the bot's connection to Discord.",
    usage: "^ping",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const fs = require('fs');
    // const cmdusage = JSON.parse(fs.readFileSync("./data/command-usage.json", "utf8"));
    
    const memusage = JSON.parse(fs.readFileSync("./data/memory-usage.json", "utf8"));   
   
    let ping = Math.floor(bot.ws.ping);
    // let cmdtotal = cmdusage.total;
    let memused = Math.floor(memusage.memory);
    // let totalMembers = bot.guilds.cache.size;
   
    message.channel.send({
     embed: {
      color: bot.settings.color.green,
      title: 'TotinoBot Status',
      description: `**Bot Statistics**\n\n**Ping:** ${ping}\n**Memory Usage:** ${memused}MB/128MB\n**Version:** ${bot.settings.version}`
     }
    });
   
   }};
