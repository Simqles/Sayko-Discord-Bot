const { Discord, MessageEmbed, Collection, Map, Client} = require('discord.js');
const client = new Client();
const {prefix, token, link} = require('./configs/settings.json');
const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");
const AsciiTable = require('ascii-table');
//Modüller




//
//Command Handler

var commandtable = new AsciiTable('Simqle Command Table');



client.commands = new Collection();
client.aliases = new Collection();

commandtable.setHeading("Command", 'Status', "Aliases")
fs.readdirSync('./commands').forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const commandolar = require(`./commands/${dir}/${file}`);
    
    
    
    
      if (commandolar.help.name) {
      client.commands.set(commandolar.help.name, commandolar);
      commandtable.addRow(commandolar.help.name, "✔️", commandolar.conf.aliases)
    } else {
      commandtable.addRow(commandolar.help.name, "❌")
      continue;
        }
    
    
        
        commandolar.conf.aliases.forEach(alias => {
          client.aliases.set(alias, commandolar.help.name);
        });
      }
})
console.log(chalk.cyan(commandtable.toString()))

//Handler lar
client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === 807989751134552074) permlvl = 5;
  return permlvl;
};

client.on('message', async(message) => {
  if (message.author.bot) return;
  if(!await db.has("prefix_" + message.guild.id)) {
    var prefix = "s!";
  } else {
    var prefix = await db.fetch("prefix_" + message.guild.id)
  }

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

//son dakka mesaj eventi
/*
client.on('guildMemberAdd', async() => {
  let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});

    var channel = await qdb.fetch(`guvenlikkanali_${member.guild.id}`);
    var text = await qdb.fetch(`guvenlikyazi_${member.guild.id}`);

    var kanalcık = member.guild.channels.cache.get(channel);  
    
    if(!kanalcık) return;
    
    var SAFErandomMesajlar = [
        "Kişi Güvenli ",
        "Güvenlisin "
    ]
       var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]
        var DANGERrandomMesajlar = [
            "Kişi Tehlikeli ",
            "Çok Tehlikeli Geldin Az Yavaş"
        ]        
            var DANGERrandomMesajlar1 = DANGERrandomMesajlar[Math.floor(Math.random() * (DANGERrandomMesajlar.length))]
        
        var kurulus = new Date().getTime() - member.user.createdAt.getTime()

        let durumMesajı;
        let durum;

        if(kurulus > 2629800000)  durumMesajı = SAFErandomMesajlar1
        if(kurulus > 2629800000)  durum = "Güvenli"

        if(kurulus < 2629800000)  durumMesajı = DANGERrandomMesajlar1
        if(kurulus < 2629800000)  durum = "Tehlikeli"

        if(text)  var textcik = text.replace("{guild}", `**${member.guild}**`).replace("{user}", `**${member.user.username}**`).replace("{durum}", `**${durum}**`)
        var textcikcik = text ? textcik : durumMesajı;
        


    if(!kanalcık) return;

    var embedv1 = new Discord.MessageEmbed()
    .setColor("#BA75E5")
    .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    .setTitle("Kullanıcı Başarıyla Test Edildi")
    .setThumbnail(member.guild.iconURL({dynamic: true, format: "png", size: 1024}))
    .setDescription(textcikcik)
    .setTimestamp()
    .addField("Log Detayları", `Katılan Kişi: **${member}**\nSunucuya Giriş Tarihi: **${tarih}**\Güvenlik Durumu: **${durum}**`)

    return kanalcık.send(embedv1);




}) */
//Event lar


client.on('message', async(message) => {
    if(message.author.bot) return;
    if(message.content.toLowerCase === 'sa') {
        message.channel.send('Aleyküm Selam')
    }
    if(message.content.toLowerCase === 'sea') {
        message.channel.send('Aleyküm Selam')
    }
    if(message.content.toLowerCase === 'bb') {
        message.channel.send('Görüşürük')
    }

})
client.on('message', async(message) => {
  if(message.author.bot) {
      return
  }
  const data = await db.fetch(`levelUser_${message.author.id + message.guild.id}`)
  const randomExp = require('./randomExp.js');
  if(data != null) {
      await db.set(`levelUser_${message.author.id + message.guild.id}`,{id:message.author.id,level:data.level,exp:data.exp+randomExp,expLimit:data.expLimit,totalExp:data.totalExp+randomExp})
    
  }
  if(data != null) {
      if(data.expLimit < data.exp) {
      await  db.set(`levelUser_${message.author.id+message.guild.id}`,{id:message.author.id,level:data.level+1,exp:0,expLimit:data.expLimit*2,totalExp:data.totalExp+randomExp})
      return message.channel.send(`<@${message.author.id}> Level atladın tebrikler.Yeni levelin ${data.level+1}`)
 
   }
  }
  if(data == null) {
    await db.set(`levelUser_${message.author.id+message.guild.id}`,{id:message.author.id,level:0,exp:randomExp,expLimit:100,totalExp:randomExp})
  }
})

client.on("message", async(message) => {
  var data = await db.fetch(`kufur_${message.guild.id}`, true);
  if(!data) return;
  if(!data == true) return;
  if(message.author.bot) return;
  const kufur = ["sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
  if (kufur.some(word => message.content.includes(word)) ) {
      message.reply("Bu sunucuda küfür engel sistemi var lütfen küfür etme")
      message.delete()
  }
});


//Mesaj eventi

client.on('ready', async() => {
  console.log(chalk.cyan("\n ad88888ba  88                                88             \nd8\"     \"8b \"\"                                88             \nY8,                                           88             \n`Y8aaaaa,   88 88,dPYba,,adPYba,   ,adPPYb,d8 88  ,adPPYba,  \n  `\"\"\"\"\"8b, 88 88P'   \"88\"    \"8a a8\"    `Y88 88 a8P_____88  \n        `8b 88 88      88      88 8b       88 88 8PP\"\"\"\"\"\"\"  \nY8a     a8P 88 88      88      88 \"8a    ,d88 88 \"8b,   ,aa  \n \"Y88888P\"  88 88      88      88  `\"YbbdP'88 88  `\"Ybbd8\"'  \n                                           88                \n                                           88                \n\n" + Date()))
})
















client.login(token)