const { MessageEmbed } = require('discord.js');
const {prefix, token, link} = require('../../configs/settings.json');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");



exports.run = async(client, message, args) => {
    var args = args[0];
    let lala = new MessageEmbed()
    .setTitle('⚠️**Sayko Bot Küfür Engel Sistemi**⚠️')
    .setDescription(
        '• **Eğer `<prefix>küfür aç` derseniz küfür engel sistemi açılır**\n• **Eğer `<prefix>küfür kapat` derseniz küfür engel sistemi kapanır**'
    )
    .setFooter('Simqle Tech. 2021')
    .setTimestamp();
    let lalar = new MessageEmbed()
    .setTitle('⚠️**Sayko Bot Küfür Engel Sistemi**⚠️')
    .setDescription(
        '• **Küfür Sitemi Başarı İle Kapatıldı**'
    )
    .setFooter('Simqle Tech. 2021')
    .setTimestamp();
    let lalam = new MessageEmbed()
    .setTitle('⚠️**Sayko Bot Küfür Engel Sistemi**⚠️')
    .setDescription(
        '• **Küfür Sistemi Başarı İle Açılıdı**'
    )
    .setFooter('Simqle Tech. 2021')
    .setTimestamp();
    var data = await db.fetch(`kufur_${message.guild.id}`, true)
    
    if(!args) {
        message.channel.send(lala)
    }
    else if(args === 'aç') {
        if(await db.fetch(`kufur_${message.guild.id}`, true)) return message.channel.send('Veri Zaten Var :D ')
        await db.set(`kufur_${message.guild.id}`, true);
        message.channel.send(lalam)
    }
    else if(args === 'kapat') {
        if(!await db.fetch(`kufur_${message.guild.id}`, true)) return message.channel.send('Veri Yok Silemem D: ')
        await db.delete(`kufur_${message.guild.id}`, true)
        message.channel.send(lalar)
    }
};
exports.conf = {
    aliases: ['küfür'],
    permLevel: 0
};
exports.help = {
    name: 'kufur',
    description: 'kufur sistemi',
    usage: '<prefix>kufur'
};