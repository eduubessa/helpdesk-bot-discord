const fs = require('fs');
const Discord = require('discord.js');
const config = require('../Config/discord');
const connection = require('../Database/mysql')


const basedir_path = "/Users/eduubessa/WebstormProjects/tickets-bot-discord/Resources/Files/Messages/"
const client = new Discord.Client();

// CommandController
const CommandController = require('../App/Controllers/CommandController');


client.on('ready', () => {
    console.log("Bot is now connected!");
});

client.on('message', (message) => {

        if(message.content.startsWith("!abrir-ticket"))
        {
            if (message.channel.name === "📋-tickets")
            {

                let server = message.guild;
                let ticketName = "ticket-" + (Math.round(Math.random(1000000, 9000000) * 100000000)).toString();

                let nickname = message.author.client.user.id + "#" + message.author.client.user.discriminator;

                server.createChannel(ticketName, "text").then((chan) => {
                    chan.overwritePermissions(message.guild.roles.find(role => role.name === '@everyone'), { VIEW_CHANNEL: false });
                    chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Founder'), { VIEW_CHANNEL: true });
                    chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Staff'), { VIEW_CHANNEL: true });
                    chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Moderator'), { VIEW_CHANNEL: true });
                    chan.overwritePermissions(message.author.id, { VIEW_CHANNEL: true})
                });

                console.log("Author ID: " + message.author.id)
                console.log("Author username: " + message.author.username + "#" + message.author.discriminator)
            !
                message.delete();

                let data = [
                    1, ticketName, message.content.replace("!abrir-ticket ", "")
                ]

                connection.query("insert into `tickets` (user_id, reference, message) values (?, ?, ?)", data, (err, result) => {
                    if (err) throw err;
                    console.log("Created ticket and save ticket with success!");
                });
                
                setTimeout(() => {
                    const lastTicketChannel = message.guild.channels.find(c => c.name === ticketName);


                    var support_message = ">>> \n**Bem-vindo ao suporte do Chiquinho**\n\n" +
                    "Olá sou o Chiquinho estamos aqui para te ajudar, por isso criamos este sistema, para que possamos solucionar o teu problema o mais " +
                    "breve possível. Tenta ser o mais claro possivel para que sejamos eficazes na solução do teu problema. Agradecemos pela tua confiança!" + 
                    "\n\n*Aguardamos pela tua resposta ...*"

                    console.log(lastTicketChannel.send(support_message));
                }, 1000);
            }
        
        }

        message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 0 })

        if(message.content.startsWith('!ticket-resolvido')) {
            const reference_ticket = message.channel.name;

            let data = [
                reference_ticket
            ]

            connection.query("update `tickets` set reply_by=1, is_solved=1 where reference like ?", data, (err, result) => {
                if (err) throw err;
                console.log("Created ticket and save ticket with success!");
            });

            console.log(reference_ticket);
        }
        
        if(message.content.startsWith('!fechar-ticket')) {
            
            if(message.channel.name.startsWith('ticket-')){
                const closeChannelTicket = message.guild.channels.find(c => c.name === message.channel.name);

                closeChannelTicket.delete();

                console.log("Ticket fechado com sucesso!")
            }

            if(message.member.hasPermission("Administrador"))
            {
                console.log("hello admin");
            }

        }


        /**
         * Comando para criar um channel para enviar as candidaturas em modo privado
         */
        if(message.content.startsWith("!enviar-candidatura"))
        {
            let server = message.guild;
            let interview = "candidatura-" + (Math.round(Math.random(1000000, 9000000) * 100000000)).toString();

            server.createChannel(interview, "text").then((chan) => {
                chan.overwritePermissions(message.guild.roles.find(role => role.name === '@everyone'), { VIEW_CHANNEL: false });
                chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Founder'), { VIEW_CHANNEL: true });
                chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Staff'), { VIEW_CHANNEL: true });
                chan.overwritePermissions(message.guild.roles.find(role => role.name === 'Creative Moderator'), { VIEW_CHANNEL: true });
                chan.overwritePermissions(message.author.id, { VIEW_CHANNEL: true})
            });

            message.delete();
            
            setTimeout(() => {
                let file = null;
                const channelInterview = message.guild.channels.find(c => c.name === interview);

                switch(message.channel.name)
            {
                case "👮-creative-psp": file = "enviar-candidaturas.psp"; break;
                case "💂-creative-gnr": file = "enviar-candidaturas.gnr"; break;
                case "🚑-creative-inem": file = "enviar-candidaturas.inem"; break;
                case "🚒-creative-bombeiros": file = "enviar-candidaturas.bombeiros"; break;
                case "🩺-creative-médico": file = "enviar-candidaturas.medicos"; break;
                case "💉-creative-enfermagem": file = "enviar-candidaturas.enfermagem"; break;
                case "💼-creative-advogado": file = "enviar-candidaturas.mpublico"; break;
                case "👨🏻-creative-ministério-público": file = "enviar-candidaturas.gnr"; break;
                case "🏫-creative-formaçoes": file = "enviar-candidaturas.formacoes"; break;
                case "📻-creative-radio": file = "enviar-candidaturas.radio"; break;
                case "📰-creative-jornal": file = "enviar-candidaturas.jornal"; break;
                case "🎭-creative-orgs": file = "enviar-candidaturas.orgs"; break;
            }

                fs.readFile(`${basedir_path}enviar/${file}.txt`, 'utf8', (err, data) => {
                    if (err) throw err;
                    channelInterview.send(data);
                });

            }, 1000);
        }


        /**
         * Abrir candidaturas
         */
        if(message.content.startsWith("!abrir-candidaturas"))
        {
            let file = null;

            const channel = message.guild.channels.find(c => c.name === message.channel.name);

            switch(message.channel.name)
            {
                case "👮-creative-psp": file = "abrir-candidaturas.psp"; break;
                case "💂-creative-gnr": file = "abrir-candidaturas.gnr"; break;
                case "🚑-creative-inem": file = "abrir-candidaturas.inem"; break;
                case "🚒-creative-bombeiros": file = "abrir-candidaturas.bombeiros"; break;
                case "🩺-creative-médico": file = "abrir-candidaturas.medicos"; break;
                case "💉-creative-enfermagem": file = "abrir-candidaturas.enfermagem"; break;
                case "💼-creative-advogado": file = "abrir-candidaturas.mpublico"; break;
                case "👨🏻-creative-ministério-público": file = "abrir-candidaturas.gnr"; break;
                case "🏫-creative-formaçoes": file = "abrir-candidaturas.formacoes"; break;
                case "📻-creative-radio": file = "abrir-candidaturas.radio"; break;
                case "📰-creative-jornal": file = "abrir-candidaturas.jornal"; break;
                case "🎭-creative-orgs": file = "abrir-candidaturas.orgs"; break;
            }

            message.delete();

            fs.readFile(`${basedir_path}abrir/${file}.txt`, 'utf8', (err, data) => {
                if (err) throw err;
                channel.send(data);
            });
        }

        /**
         * Fechar as candidaturas
         */
        if(message.content.startsWith("!fechar-candidaturas"))
        {
            let file = null;

            const channel = message.guild.channels.find(c => c.name === message.channel.name);

            switch(message.channel.name)
            {
                case "👮-creative-psp": file = "fechar-candidaturas.psp"; break;
                case "💂-creative-gnr": file = "fechar-candidaturas.gnr"; break;
                case "🚑-creative-inem": file = "fechar-candidaturas.inem"; break;
                case "🚒-creative-bombeiros": file = "fechar-candidaturas.bombeiros"; break;
                case "🩺-creative-médico": file = "fechar-candidaturas.medicos"; break;
                case "💉-creative-enfermagem": file = "fechar-candidaturas.enfermagem"; break;
                case "💼-creative-advogado": file = "fechar-candidaturas.advogado"; break;
                case "👨🏻-creative-ministério-público": file = "fechar-candidaturas.mpublico"; break;
                case "🏫-creative-formaçoes": file = "fechar-candidaturas.formacoes"; break;
                case "📻-creative-radio": file = "fechar-candidaturas.radio"; break;
                case "📰-creative-jornal": file = "fechar-candidaturas.jornal"; break;
                case "🎭-creative-orgs": file = "fechar-candidaturas.orgs"; break;
            }

            message.delete();

            fs.readFile(`${basedir_path}fechar/${file}.txt`, 'utf8', (err, data) => {
                if (err) throw err;
                channel.send(data);
            });
        }

});

client.login(config.development.token);
