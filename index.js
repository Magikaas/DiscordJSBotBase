const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const RoleManager = require('./class/RoleManager');
const Command = require('./class/Command');

const roleManager = new RoleManager();

// Import the config.
let config = require('./config.json');
const botEnv = require('./env.json');

client.commands = new Discord.Collection();
client.schedule = [];

function guaranteeFile(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "");
    }
}

// Load the command files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

config = config[botEnv.version];
const prefix = config.prefix;

// Debugging, log the prefix of the bot.
console.log("Prefix: " + prefix);

// If config has any special values for commands, add them now.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (config.commands) {
        const configCommands = config.commands;

        if (Object.keys(configCommands).includes(command.name)) {
            for (let k in configCommands[command.name]) {
                command[k] = configCommands[command.name][k];
            }
        }
    }

    client.commands.set(command.name, command);
}

// Set the bot's presence.
client.once('ready', () => {
    client.user.setPresence({
        status: "online",
        afk: false,
        activity: {
            name: config.activity,
            type: "PLAYING"
        }
    });

    console.log('Ready, running on "' + client.user.username + '"!');
});

// Command handling.
client.on("message", async function(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length + 1).split(/ +/);

    let commandName = args.shift().toLowerCase();

    let commandObject = client.commands.get(commandName);

    const command = new Command.Command(commandObject, args, message, prefix);

    command.run();
});

client.roleManager = roleManager;

client.login(config.token);