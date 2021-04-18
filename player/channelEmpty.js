module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Müzik Durduruldu sebep: Kanalda Kimse Yok !`);
};