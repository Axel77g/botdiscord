//L'utilisation de ce code est interdite sans accord.

//VARIABLES//

var resultdate = ""

var fda = []

var stream = {};

var idconnexion = {};

const Discord = require('discord.js');

var bot = new Discord.Client();



var Twit = require('twit')

var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
});

const PREFIX = "!";

// FUNCTIONS //

function verif(){
  if(fda.length > 1){
    if(idconnexion.speaking){
    }else{
      fda.splice(0,1);    
      setTimeout(function(){
      playsong(fda[0]); 
      }, 3000);
    }
  }else{
  }
}

function getinfo(url, volume, message){

  ytdl.getBasicInfo(url, function(err, data){
    
     var title = data.title ;
     var duration = data.length_seconds ;
     var author = data.author;
     var info = [title, duration, url, volume, author,message.channel];
     fda.push(info)
     
     
  });
  
}
function connection(message){

  if(message.member.voiceChannel){

    message.member.voiceChannel.join().then(connexion => {

      idconnexion = connexion

    }).catch(console.error)
    console.log('connexion reussie')
    message.channel.send('**:loud_sound: CONNEXION REUSSIE**')

  }else{
    console.error('Pas conneté a un salon')
  }
}
function playsong(data){
  
  var title = data[0];
  var seconde = data[1]%60;
  var min = Math.trunc(data[1]/60)
  var url = data[2];
  var volume = data[3];
  var author = data[4]
  var channel = data[5]
  var streamOptions = { seek: 0, volume: volume };
  stream = ytdl(url, { filter : 'audioonly', quality: 'highest'});
  //console.log('INFO STREAM:', {url, volume, streamOptions, stream})
  //idconnexion.playStream(stream, streamOptions);
  const dispatcher = idconnexion.playStream(stream, streamOptions);
  let infosong = new Discord.RichEmbed()

    .setTitle(title)

    .setColor("#ae3fff")

    .setThumbnail(author.avatar)

    .setAuthor(author.name, author.avatar)

    .addField('Lien: ', '[https://youtube.com]('+ url +')')

    .addField('Durée: ', min + 'min' + seconde)

    .setFooter("Merci d'être la ! Ritara | " + heure());

    channel.send(infosong);

}
function recoverinfo(data, i, message){
  var title = data[0];
  var seconde = data[1]%60;
  var min = Math.trunc(data[1]/60)
  var url = data[2];
  var author = data[4]
  var volume = data[3];
  var num = i+1
  let queue = new Discord.RichEmbed()

        .setTitle("File D'attente")

        .setColor("#ae3fff")

        .setThumbnail(author.avatar)

        .setAuthor(author.name, author.avatar)

        .addField("Morceau n°" + num,'\n \n Lien: ' + '[https://youtube.com]('+ url +')')

        .addField(title, 'Durée: '+ min + 'min' + seconde)

        .setFooter("Merci d'être la ! Ritara | " + heure());

        message.channel.send(queue);
}
function play(url, volume, message){
        
  getinfo(url, volume, message);

  connection(message);

  setTimeout(function(){

    console.log(fda);
    playsong(fda[0]);

  }, 3000);
}

setInterval(verif,5000)

function createDate(dateachange){

  var splitdata = dateachange.split(" ");
  var day = splitdata[2];
  var month = splitdata[1];
  var years = splitdata[3];
  var dataheure = splitdata[4].split(":")
  console.log(dataheure[0]);
  console.log(dataheure[1])
  resultdate = day + " " + month + " " + years + " à " + dataheure[0] + "h" + dataheure[1]
  return resultdate

}

function heure(){

  var now = new Date()

  var jour = now.getDate()
        if(jour < 10){
          var jour = "0" + jour
        }
        var mois = now.getMonth() + 1
        if(mois < 10){
          var mois = "0" + mois
        }
  var annee = now.getFullYear()

  var hours = now.getHours() + 1
        if(hours < 10){
          var hours = "0" + hours
        }
        if(hours === 24){
          var hours = 0
        }
        if(hours === 25){
          var hours = 1
        }

  var min = now.getMinutes()
        if(min < 10){
          var min = "0" + min
        }
  var date = "Le " + jour + "/" + mois + "/" + annee + " à " + hours + "h" + min
  
  return date
}

//EVENTS//

bot.on('ready', () => {


  bot.user.setActivity('!info');

  bot.channels.get('505503616308740096').send(`Je suis connecté #ON ! :grin:`);

  console.log(bot.user)

  

});

bot.on('message', message => {

  if(message.content === "!play"){
  // Play streams using ytdl-core
  const ytdl = require('ytdl-core');
  const streamOptions = { seek: 0, volume: 1 };
  message.member.voiceChannel.join()
  .then(connection => {
    const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions).on;
  })
  .catch(console.error);

  }
});


bot.login(process.env.BOT_TOKEN);
