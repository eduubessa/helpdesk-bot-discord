class Ticket {

    openTicket(message)
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
            
            message.delete();

            let data = [
                ticketName, message.content.replace("!abrir-ticket ", "")
            ]

            connection.query("insert into creativelife_fivem_db.tickets (reference, message) values (?, ?)", data, (err, result) => {
                if (err) throw err;
                console.log("Created ticket and save ticket with success!");
            });
            
            setTimeout(() => {
                const lastTicketChannel = message.guild.channels.find(c => c.name === ticketName);


                var support_message = ">>> \n**Bem-vindo ao suporte da Creative Life RP**\n\n" +
                "Olá sou o Chiquinho estamos aqui para te ajudar, por isso criamos este sistema, para que possamos solucionar o teu problema o mais" +
                "breve possível. Tenta ser o mais claro possivel para que sejamos eficazes na solução do teu problema. Agradecemos pela tua confiança!" + 
                "\n\n*Aguardamos pela tua resposta ...*"

                console.log(lastTicketChannel.send(support_message));
            }, 1000);
        }
    }

    doneTicket (message)
    {
        if(message.content.startsWith('!fechar-ticket')) {
            
            if(message.channel.name.startsWith('ticket-')){
                const closeChannelTicket = message.guild.channels.find(c => c.name === message.channel.name);

                closeChannelTicket.delete();

                console.log("Ticket fechado com sucesso!")
            }

        }
    }

}