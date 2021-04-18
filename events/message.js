const {prefix, token, link} = require('../configs/settings.json');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");

module.exports = async(client,message,args) => {
    if (message.author.bot) return;
    if(!await db.has("prefix_" + message.guild.id)) {
      var prefix = "s!";
      client.prefixer = prefix
    } else {
      var prefix = await db.fetch("prefix_" + message.guild.id)
      client.prefixer = prefix
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
    if(message.content.toLowerCase === 'sa') {
      message.channel.send('Aleyküm Selam')
  }
  if(message.content.toLowerCase === 'sea') {
      message.channel.send('Aleyküm Selam')
  }
  if(message.content.toLowerCase === 'bb') {
      message.channel.send('Görüşürük')
  }
  var data = await db.fetch(`levelUser_${message.author.id + message.guild.id}`)
  var randomExp = require('../randomExp.js');
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
  var kufur_data = await db.fetch(`kufur_${message.guild.id}`, true);
  if(!kufur_data) return;
  if(!kufur_data == true) return;
  if(message.author.bot) return;
  const kufur = ["sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
  if (kufur.some(word => message.content.includes(word)) ) {
      message.reply("Bu sunucuda küfür engel sistemi var lütfen küfür etme")
      message.delete()
  }
  
    
}