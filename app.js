const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const bot = new Discord.Client({
    disableEveryone: true
});

//DEFINE SETTINGS TO BOT
const botConfig = require("./config.json");
bot.settings = botConfig;

//FUNCTIONS TO MAKE THINGS WORK
const logger = require("./main/functions/console.js");
const utils = require("./main/functions/utilities.js");

//NEW COMMAND HANDLER
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./main/handlers/${handler}`)(bot);
})

/**
 * Event Handler
 * 
 * Read in each event file from ./main/events and then setup listeners for each event
 * on the bot client. Each event will be called with `bot, ...args`, i.e. it's normal
 * parameters preceeded with a reference to the bot client.
 */
const {
    readdirSync
} = require('fs');
let events = readdirSync('./main/events/');
events.forEach(file => {
    const name = file.slice(0, -3);
    const event = require(`./main/events/${file}`);
    bot.on(name, event.bind(null, bot));
});

bot.on("message", async message => {
    
    //Check if Ramen Bot
    if (message.author.id == "723174588992716881") {
        if(!message.embeds) return
        else {
            if (message.embeds[0].title == "Character Spawn!") {
                message.channel.send("**New Spawn** <@&760975518979326002>")
            }
        }
    }

    const prefix = bot.settings.prefix;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) {
        command.run(bot, message, args);
    }

});

//Usage Statistics

const chalk = require('chalk');

const memusage = JSON.parse(fs.readFileSync("./data/memory-usage.json", "utf8"));
var getMemUsage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100
};
bot.setInterval(function() {
    memusage.memory = getMemUsage()
    fs.writeFileSync('./data/memory-usage.json', JSON.stringify(memusage, null, 4))
}, 30000);
bot.setInterval(async function() {
    let memoryusage = getMemUsage();
    let guilds = bot.guilds.cache.size;
    let ping = Math.floor(bot.ws.ping);
    console.log(chalk.gray(`[INFO]`), chalk.yellow(`Memory Usage: ${memoryusage}`), chalk.gray(`\n[INFO]`), chalk.yellow(`Ping: ${ping}`), chalk.gray(`\n[INFO]`), chalk.yellow(`Guilds: ${guilds}`));
}, 300000);

//so it actually works
bot.login(bot.settings.token);