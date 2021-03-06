const Discord = require('discord.js');
const {prefix, token, link} = require('../../configs/settings.json');
const g9 = require("g9db");
const xdb = new g9.Database(link, "xbase");

exports.run = async(client, message, args) => {


    let { MessageAttachment } = require('discord.js')
    let canvacord = require('canvacord')
    
    let data = await xdb.fetch(`levelUser_${message.author.id + message.guild.id}`)
    let rank = new canvacord.Rank()
    .setAvatar(message.author.avatarURL({format: 'png'}))
    .setCurrentXP(data.exp , '#FF000')
    .setDiscriminator(message.author.discriminator)
    .setUsername(message.author.username)
    .setLevel(data.level)
    .setRank(10 , 'Rütbe' , false)
    .setLevelColor("#FF000" , 10)
    .setStatus(message.author.presence.status)
    .setRequiredXP(data.expLimit, '#FF000')
    .setBackground('COLOR' , '#000000')
    .setProgressBar('#FFFFFF' , "COLOR")
    .setProgressBarTrack("#000000")
    rank.build().then(data => {
        const attachment = new MessageAttachment(data , 'rank.png')
        message.channel.send(attachment)
    })  



  

};


exports.conf = {
  aliases: ['level', 'xp', 'rank'],
  permLevel: 0
};

exports.help = {
  name: 'profile',
  description: 'Botun Pingini Gösterir !',
  usage: '<prefix>profile'
};