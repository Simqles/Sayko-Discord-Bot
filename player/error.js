module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - Bu sunucuda çalınan müzik yok !`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Şu anda ses kanalında değilsin !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Kanala Katılma iznim yok !`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} - ${args[0].title} Bu şarkı ülkende oynatılamıyor, geçiliyor...`);
            break;
        case 'MusicStarting':
            message.channel.send(`Müzik Başlatılıyor... Lütfen Bekle!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Birşeyler ters gidiyor... \n : ${error}`);
    };
};
