module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - Seçim **İptal** edildi !`);
    } else message.channel.send(`${client.emotes.error} -  **1** ile **${tracks.length}** arasında numara gir!`);
};