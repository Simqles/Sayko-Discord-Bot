const Discord = require('discord.js');


exports.run = async(client, message, args) => {


    let pingem = new Discord.MessageEmbed()
      .setTitle('Sayko Ping Tablosu')
      .setAuthor(`${message.author.tag}`)
      .setDescription('Pong 🏓\nBenim Pingim ' + client.ws.ping + 'ms!')
      .setFooter('Simqle Tech. (c)      ')
      .setTimestamp();

    message.channel.send(pingem)    



  

};


exports.conf = {
  aliases: ['p', 'pong', 'uptime'],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun Pingini Gösterir !',
  usage: 'ping'
};