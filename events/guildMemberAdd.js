const {prefix, token, link} = require('../configs/settings.json');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");

module.exports = async(client,message,args) => {
    let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});

    var channel = await db.fetch(`guvenlikkanali_${member.guild.id}`);
    var text = await db.fetch(`guvenlikyazi_${member.guild.id}`);

    var kanalcık = client.channels.cache.get(channel);  
    
    if(!kanalcık) return;
    
    var SAFErandomMesajlar = [
        "Kişi Güvenli ",
        "Güvenlisin "
    ]
       var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]
        var DANGERrandomMesajlar = [
            "Kişi Tehlikeli ",
            "Çok Tehlikeli Geldin"
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



}