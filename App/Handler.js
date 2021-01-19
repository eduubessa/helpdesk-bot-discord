const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

client.commands = new Discord.Collection();

if(fs.existsSync("./App/Commands")){

    commandsFiles = fs.readdirSync('./App/Commands/').filter(file => file.endsWith('Command.js'));

    console.log(commandsFiles);

    for(const file of commandsFiles) {
        const command = require(`./Commands/${file}`);

        client.commands.set(command.name, command);

    }
}else{
    throw new Error("Não foi possivel encontrar a pasta os comandos.")
}

