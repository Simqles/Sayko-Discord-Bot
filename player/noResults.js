module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Böyle Bir Şarkı Bulunamadı ${query} !`);
};