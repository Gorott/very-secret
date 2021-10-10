const Discord = require("discord.js");
const config = require("../config");
const { profile } = require('../db')
const prefix = process.env.prefix;

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    message.player = await profile.findOne({ user: message.author.id }).exec()
    if (!message.player) message.player = await profile.create({ user: message.author.id })
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command =
      client.commands.get(cmd) ||
      client.commands.find(
        (command) => command.aliases && command.aliases.includes(cmd)
      );
    if (!command) return;

    await command.run(message, args, client)?.catch((error) => {
      console.error(error);
    });
  });
};
