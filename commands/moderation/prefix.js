const Discord = require('discord.js');
const { link } = require('../../configs/settings.json')
const g9 = require("g9db");
const db = new g9.Database(link, "Database");

exports.run = async(client, message, args) => {


    var aygır = args[0];
    if(!aygır) return message.channel.send('Lütfen Bir Prefix Belirtin');
    if(await db.has('prefix_' + message.guild.id) == aygır) return message.channel.send('Bu prefix Önceki prefix İle aynı');
    await db.set(`prefix_${message.guild.id}`, aygır)
    message.channel.send(`prefix başarı ile ${aygır} olarak ayarlandı`)    



  

};


exports.conf = {
  aliases: ['önek', 'ön-ek'],
  permLevel: 0
};

exports.help = {
  name: 'prefix',
  description: 'Botun Pingini Gösterir !',
  usage: 'prefix'
};