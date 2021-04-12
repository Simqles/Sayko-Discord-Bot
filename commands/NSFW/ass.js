const{ MessageEmbed } = require('discord.js')
const superagent = require('superagent');


exports.run = async(client,message,args) => {
	      if (message.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'ass'})
        .end((err, response) => {
          var kk = new MessageEmbed()
          .setImage(`${response.body.message}`)
          .setColor('YELLOW');
          message.channel.send(kk);
        });
      } else {
        message.channel.send("This isn't NSFW channel!")
      }
}
exports.conf = {
	aliases: ["am"],
	permLevel: 0
}
exports.help = {
	name:"ass"
}