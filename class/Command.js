const { RoleManager } = require("discord.js");

class Command {
    
    constructor(command, args, message, prefix) {
        this.command = command;
        this.args = args;
        this.message = message;
        this.prefix = prefix;

        this.roleManager = new RoleManager.RoleManager();
    }

    run() {
        if (!this.command) {
            this.message.reply("That command could not be found. Type `" + this.prefix + " commands` to see this bot's commands.");
            return;
        }
    
        // Admin only means admin only (duh :P)
        if (this.isAdminCommand() && !this.RoleManager.senderIsAdmin(message)) return;
    
        let hasRole = false;
    
        if (this.command.requiredRoles) {
            for (const role of command.requiredRoles) {
                // If we have any of the required roles (requiredRoles is an OR list) run the command.
                if (this.RoleManager.senderHasRoleWithName(message, role)) {
                    hasRole = true;
                    break;
                }
            }
        }
        else {
            hasRole = true;
        }
    
        if (!hasRole) {
            message.reply("You lack the required permissions to execute this command");
            return;
        }
        
        this.runCommand();
    }

    runCommand() {
        const guildId = this.message.guild.id;
        
        this.execute();
    }

    execute() {
        try {
            this.command.execute(this.message, this.args);
        }
        catch (error) {
            console.log(error);
            this.message.reply("There was an error trying to execute command: '" + this.command.name + "'.");
            // message.reply("Error: " + error.message);
        }
    }

    isAdminCommand() {
        return !!this.command.admin;
    }

    requiresRoles() {
        return !!this.command.requiredRoles;
    }

    getRequiredRoles() {
        return this.command.requiredRoles;
    }
}

module.exports = {
    Command
}