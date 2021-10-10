module.exports = (client) => {
    client.on("ready", () => {
        client.user.setActivity("Gutentag");
        console.log(`I am awake!`);
      });
}