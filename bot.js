require("dotenv").config();

const mongo = require("./db");
const { Collection, Client, Discord } = require("discord.js");
const fs = require("fs");
const client = new Client({
  disableEveryone: true,
  intents: 32767,
});
client.db = mongo;

client.slashCommands = new Collection()
fs.readdir("./commands/", (err, files) => {
    files.forEach((file) => {
        let path = `./commands/${file}`
        fs.readdir(path, (err, files) => {
            if (err) console.error(err)
            let jsfile = files.filter((f) => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.error(`Couldn't find slash commands in the ${file} category.`)
            }
            jsfile.forEach((f, i) => {
                let props = require(`./commands/${file}/${f}`)
                props.category = file
                try {
                    client.slashCommands.set(props.command.name, props)
                } catch (err) {
                    if (err) console.error(err)
                }
            })
        })
    })
})

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  require(`./events/${file}`)(client);
}

client.login(process.env.token);

client.on("error", (e) => console.error);

module.exports = { client };
