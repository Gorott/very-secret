const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice')

module.exports = {
  command: {
        name: "ding",
        description: "Replies with bot ping."
    },
  run: async (interaction, client) => {
    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    })
    console.log(process.cwd() + 'music/FunkyTune.mp3')
    const player = createAudioPlayer()
    const resource = createAudioResource(process.cwd() + '/music/FunkyTune.mp3', {
      inputType: StreamType.Arbitrary
    })
    const subscription = connection.subscribe(player)
    player.play(resource)
    player.on('error', err => {
      console.error(err.message)
    })
  }
};
