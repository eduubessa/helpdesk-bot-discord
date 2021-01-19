module.exports = {

    name: 'ping',
    description: 'Says hello',
    execute (message, args) {
        message.channel.send("pong!");
    }
};