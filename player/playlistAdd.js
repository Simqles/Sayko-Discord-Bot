module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.music} - ${playlist.title} kuyruğa eklendi (**${playlist.tracks.length}** songs) !`);
};