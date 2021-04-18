module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - Geçerli bir yanıt sağlamadınız ... Komutu tekrar gir !`);
};