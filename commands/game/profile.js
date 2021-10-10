const { profile } = require('../../db')

module.exports = {
    name: "profile",
    description: "Replies with bot ping.",
    usage: `${process.env.PREFIX}ping`,
    aliases: ["heartbeat", "response"],
    run: async (message, args) => {
        let data = await profile.findOne({ user: message.author.id })
      message.channel.send(`${data.balance.wallet} ${data.xp.xp}`)
    },
  };