module.exports = client => {
    var randomMesajlar = [

        "Yardım için s!yardım",
        "Simqle geliştiriliyor"
    ]
    
    
    
    
    setInterval(function() {
        var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
        client.user.setActivity(`${randomMesajlar1}`);
    
    }, 2 * 30000);
    
    client.user.setStatus("idle");
}