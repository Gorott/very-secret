module.exports = (client) => {
  client.on("ready", () => {
    client.user.setActivity("Gutentag");
    console.log(`I am awake!`);
    let done = 0
            client.slashCommands.each((cmd) => {
                client.application.commands.create(cmd.command, '810583956536950794')
                    done += 1
                console.log(cmd.command)
            })
            console.log(`${done} slash commands created/updated.`)
  });
};
