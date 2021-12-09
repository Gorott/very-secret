const Discord = require("discord.js");
const { guild } = require("../db");
const prefix = process.env.prefix;


module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.player)
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(prefix)) return;
    
    message.dbGuild = await guild.findOne({ guild: message.guild.id }).exec()
        if (!message.dbGuild) message.dbGuild = await guild.create({ guild: message.guild.id })

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
