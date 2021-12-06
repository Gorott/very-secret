module.exports = {
  command: {
        name: "ping",
        description: "Replies with bot ping."
    },
  run: async (interaction, client) => {
        interaction.reply(`Ping! ${Math.ceil(interaction.client.ws.ping)} ms.`)
  }
};
