const {MessageEmbed, Client} = require('discord.js');
const {prefix, token, link} = require('../../configs/settings.json');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");
exports.run = async(client, message, args) => {
    let user = message.author;
    var data = await db.fetch(`money_${user.id}`);
    var shopEmbed = new MessageEmbed()
    .setTitle('Sayko Market')
    .setDescription("<:premium:817107569586864169> **Rank 1 Klasik Badge** id:`RANK1` Fiyat:15000$\n<:plus:817107570250088468> **Rank 2 Hacker Badge** id:`RANK2` Fiyat:50000$\n<:cllasical:817107570199101461> **Rank 3 Coder Badge** id:`RANK3` Fiyat:100000$\n<:developer:817107569885446144> **Rank 4 Developer Badge** id:`RANK4` Fiyat:250 000$\n<:angel:817107571038093313> **Rank 5 Angel Badge** id:`ANGEL` Fiyat:1 000 000$")
    .setFooter(message.author.username + " Simqle Tech(c)" + data)
    .setTimestamp();
    message.channel.send(shopEmbed);
}
exports.conf = {
    aliases: ['mağaza', 'dükkan', 'avm', 'market'],
    permLevel: 0
}
exports.help = {
    name: 'shop',
    description: 'mağazayı gösterir',
    usage: '<prefix>shop'
}