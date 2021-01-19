'use strict';

class CommandController {

    client = null;

    check(command)
    {
        this.client = client;

        if(command.includes('"'))
        {
            // Speak with Bot

            if(command.includes('hello'))
            {
                return "hello"
            }

            console.log(command.split('"')[1]);
        }else{
            console.log(command.split(' ')[1]);
        }
    }

    execute(message)
    {
        // message.channel.send(`Olá ${message.author.username}!`);
        if(message.content.includes('Ola')) {
            message.channel.send(`Olá ${message.author.username}!`);
        } else if(message.content.includes('ban')) {
            console.log(message.mentions.users.get());
            // message.channel.send(`<@!${message.mentions.users[1].id}> foste banido/a do servidor!`);
        }
    }

sadf
}

module.exports = CommandController;