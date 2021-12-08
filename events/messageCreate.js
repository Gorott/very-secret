const Discord = require("discord.js");
const { profile, guild } = require("../db");
const prefix = process.env.prefix;

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.player)
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
