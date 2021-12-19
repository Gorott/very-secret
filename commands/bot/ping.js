module.exports = {
    name: "ping",
    description: "Replies with bot ping.",
    usage: `${process.env.PREFIX}ping`,
    aliases: ["heartbeat", "response"],
    run: async (message, args) => {
        message.channel.send(`Ping! ${Math.ceil(message.client.ws.ping)} ms.`)
    },
}