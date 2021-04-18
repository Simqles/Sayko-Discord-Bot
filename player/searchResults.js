module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            author: { name: `BUnla ilgili sonuç yok ${query}` },
            footer: { text: 'simqle bot' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};