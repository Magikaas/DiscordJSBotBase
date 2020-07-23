# Discord.JS Bot Base
A base for a Discord.js bot. Easily expandable. More explanation in readme

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install
```

## Preparation before first run

Add a `./config.json` file to the root of the bot.

Contents:

```json
{
    "live": {
      "prefix": "!prefix",
      "activity": "Doing something",
      "token": "live-bot-token-here",
      "commands": []
    },
    "test": {
      "prefix": "!testprefix",
      "activity": "Testing something",
      "token": "test-bot-token-here",
      "commands": []
    }
}
```

Replace the token texts with the relevant tokens from your bot (or remove the test part, if you do not have a test bot) and change the prefix to whatever you want to use as a prefix for your bot.

## Run the bot

```sh
$ node .
```

## Commands

### Example:

```js
const Discord = require('discord.js');

module.exports = {
    name: "commands",
    description: "Show this list.",
    excluded: true,

    execute(message, args) {
        let embedObject = {
            color: 0x00ff00,
            title: "Commands",
            author: {
                name: "Commands",
                icon_url: "<ENTER ICON URL HERE>",
                url: "http://www.google.com/"
            },
            description: "A list of all the commands usable with this bot.",
            thumbnail: {},
            fields : [],
            image: {},
            timestamp: new Date(),
            footer: {
                text: "footer text",
                icon_url: "<ENTER ICON URL HERE>"
            }
        };

        for (let command of message.client.commands) {
            let cmd = command.pop();

            if (cmd.excluded) {
                continue;
            }
            embedObject.fields.push({
                name: cmd.name,
                value: cmd.description
            });
        }

        message.reply({ embed: embedObject});
    }
};
```

As shown in the `./commands/commands.js` file, this is an example of a command the commandhandler in `./index.js` can run. Through the `./class/Command.js` class.

### Adding a new command

To add a new command, just add a new `.js` file to the commands folder, the name you give it, is the way you call the command.

### Running a command

Send a message to any channel the bot has access to like this: `!prefix <commandname> <args>`

Example: `!mynewbot commands`

### Customising a command per version (test/live)

`./config.json` has a commands key.

This can be filled with custom properties for commands.

Making a command adminOnly in a live version for example:

```json
{
    "live": {
      "prefix": "!prefix",
      "activity": "Doing something",
      "token": "live-bot-token-here",
      "commands": [
          "commands": {
              "adminOnly": true
          }
      ]
    },
    "test": {
      "prefix": "!testprefix",
      "activity": "Testing something",
      "token": "test-bot-token-here",
      "commands": []
    }
}
```

This will add an adminOnly property to a command when it is loaded in the relevant version.

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/Magikaas/DiscordJSBotBase/issues/new).

## Author

**Jon Schlinkert**

* [github/magikaas](https://github.com/magikaas)
* [twitter/magikaas](http://twitter.com/magikaas)