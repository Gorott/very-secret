const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice')
const fs = require('fs')
const shuffle = require('shuffle-array')
const { guild } = require('../../db.js')

module.exports = {
  command: {
        name: "ding",
        description: "Replies with bot ping.",
        options: [
          {
            type: "STRING",
            name: "genre",
            description: "Enter the music genre you want to play Guess The Song with.",
            choices: [
              { name: "rock", value: "Rock" },
              { name: "alternative", value: "Alternative" },
              { name: "r&b", value: "R&B" },
              { name: "dancepop", value: "Dancepop" },
              ]
          }]
    },
  run: async (interaction, client) => {
    let genre = interaction.options.getString("genre")
    genres = ['Rock', 'Alternative', 'R&B', 'Dancepop']
    let data = await guild.findOne({ guild: interaction.guild.id })
    if (!interaction.member.voice.channel) return interaction.reply({ content: `You have to be in a voice channel to play Guess The Song!`, ephemeral: true })
    if (data.playing == true)  return interaction.reply({ content: `Guess the song is already being played in your server.`, ephemeral: true })
    if (genres.includes(genre)) {
      fs.readdir(process.cwd() + `/music/Random`, (err, files) => {
        shuffle(files)
        const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    })
    const player = createAudioPlayer()
    const resource = createAudioResource(process.cwd() + `/music/Random/${files[0]}`, {
      inputType: StreamType.Arbitrary
    })
    const subscription = connection.subscribe(player)
    player.play(resource)
    data.playing = true
    data.queue = files.pop()
    data.save()
    player.on('error', err => {
      console.error(err.message)
    })
      })
    }
    
  }
};
