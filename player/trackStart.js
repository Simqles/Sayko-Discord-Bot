module.exports = (client, message, track) => {
    message.channel.send(`${client.emotes.music} - Şimdi Oynuyor ${track.title} Şurada ${message.member.voice.channel.name} ...`);
};