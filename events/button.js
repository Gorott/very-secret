const { MessageActionRow, MessageButton } = require("discord.js")


module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isMessageComponent() && interaction.componentType !== "BUTTON") return
    })
}