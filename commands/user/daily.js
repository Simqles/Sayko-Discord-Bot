const { MessageEmbed } = require('discord.js');
const {prefix, token, link} = require('../../configs/settings.json');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");
const ms = require('ms');


exports.run = async(client, message, args) => {
  let user = message.author;

  let timeout = 86400000;
  let amount = 500;

  let daily = await db.fetch(`daily_${user.id}`);
  
  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  

    message.channel.send(`Sen Zaten Paranı almışsın **${time}** beklemen gerek `);
  } else {
  message.channel.send(`**${message.author.username}**, 500$ günlük paranı aldın!`);

    await db.add(`money_${user.id}`, amount)
    await db.set(`daily_${user.id}`, Date.now())

  }
};
exports.conf = {
    aliases: ['money', 'para', 'günlük'],
    permLevel: 0
};
exports.help = {
    name: 'daily',
    description: 'kufur sistemi',
    usage: '<prefix>kufur'
};