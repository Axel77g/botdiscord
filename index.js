//L'utilisation de ce code est interdite sans accord.
var resultdate = ""

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

bot.on('ready', () => {


  bot.user.setActivity('!info');

  bot.channels.get('505503616308740096').send(`Je suis connecté #ON ! :grin:`);

  console.log(bot.user)

  log('Conneté')


});


//evenement Nouveau membre

bot.on('guildMemberAdd', member => {

  try {

    var now = new Date()
    var jour = now.getDate()
    if(jour < 10){
      var jour = "0" + jour
    }
    var mois = now.getMonth() + 1
    if(mois < 10){
      var mois = "0" + mois
    }
    var anee = now.getFullYear()

    var hours = now.getHours() + 2
    if(hours < 10){
      var hours = "0" + hours
    }
    var min = now.getMinutes()
    if(min < 10){
      var min = "0" + min
    }
    var date = "Le " + jour + "/" + mois + "/" + anee + " à " + hours + "h" + min

    var name = member.user.username;

    console.log(name + " " + date);

    //variable new role

    let role = member.guild.roles.find('name', 'Assemblée');

    //message de bienvenue

    let bvn = new Discord.RichEmbed()

      .setTitle('Un nouveau membre a rejoins le serveur !')

      .setDescription(`Bienvenue sur Ritara ${member}, Merci de nous avoir rejoins. Bon jeu a toi !`)

      .setColor("#ae3fff")

      .setThumbnail(member.user.avatarURL)

      .setAuthor("Carlos Le BOT", bot.user.avatarURL)

      .setFooter("Merci d'être la ! Ritara | " + date);

    bot.channels.get('505506374302564372').send(bvn);
    //ajout du role

    member.addRole(role);

    log('Nouveau Membre + ajout de role effectué avec succes')


  } catch (error) {

    //erreur

    console.error(error);

    let erreur = new Discord.RichEmbed()

      .setColor("#960d0d")

      .setTitle('**ERREUR #500**')

      .addField("Il semblerait que Carlos rencontre un problème !", "Impossible d'Atribuée l'atribut")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

    bot.channels.get('505506374302564372').send(erreur);

    log('Erreur #500')

  }


});

//evenement nouveau channel

bot.on('channelCreate', channel => {

  try {

    var now = new Date()
    var jour = now.getDate()
    if(jour < 10){
      var jour = "0" + jour
    }
    var mois = now.getMonth() + 1
    if(mois < 10){
      var mois = "0" + mois
    }
    var anee = now.getFullYear()

    var hours = now.getHours() + 2
    if(hours < 10){
      var hours = "0" + hours
    }
    var min = now.getMinutes()
    if(min < 10){
      var min = "0" + min
    }
    var date = "Le " + jour + "/" + mois + "/" + anee + " à " + hours + "h" + min

    bot.channels.get('505503616308740096').send(`salon cree  avec le nom ${channel} `);

    let botname = bot.user.username;

    let info = new Discord.RichEmbed()

      .setTitle('Information Création de Channel')

      .setDescription(`Nouveau Salon Disponible ${channel}`)

      .addBlankField(true)

      .addField("Nom du salon", `${channel}`)

      .addBlankField(true)

      .addField("Type du salon",channel.type)

      .setColor("#ae3fff")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

      .setAuthor("Carlos Le BOT", bot.user.avatarURL)

      .setFooter("Merci d'être la ! Ritara | " + date);

    bot.channels.get('505506509992624128').send(info);

    console.log(good);

    log(`Channel crée : ${channel}`)

  } catch (error) {

    console.error(error);

    let erreur = new Discord.RichEmbed()

      .setColor("#960d0d")

      .setTitle('**ERREUR #501**')

      .addField("Il semblerait que Carlos rencontre un problème !", "Imposible d'envoyer les informations")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

    bot.channels.get('505503616308740096').send(erreur);

    log(`Erreur #501`)
  }
});

bot.on('message', message => {

      function transform(number){
        number = "0" + number
        return number
      }

      var now = new Date()
      var jour = now.getDate()
      if(jour < 10){
        var jour = "0" + jour
      }
      var mois = now.getMonth() + 1
      if(mois < 10){
        var mois = "0" + mois
      }
      var anee = now.getFullYear()

      var hours = now.getHours() + 2
      if(hours < 10){
        var hours = "0" + hours
      }
      var min = now.getMinutes()
      if(min < 10){
        var min = "0" + min
      }
      var date = "Le " + jour + "/" + mois + "/" + anee + " à " + hours + "h" + min
    // verif !
  if(message.content[0] === PREFIX){
    
    //split message
    let splitmessage = message.content.split(" / ");
    //command !help
    if(splitmessage[0] === '!help'){

      let help = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor("#ae3fff")

        .setTitle('Guide D\'utilisation')

        .addBlankField(true)

        .setDescription('Tu veux en savoir plsu sur mon fonctionement ? Lis mon guide d\'utilisation dès maintenant !')

        .addBlankField(true)

        .addField("**!info**", "En utlisant cette commande tu auras toutes les infos concernant le serveur et de notre twitter (**MIS A JOUR V 0.03**)")

        .addBlankField(true)

        .addField("**!mesinfos**", "Un petit doute sur ton profil ? N'hésite pas a utliser !mesinfos")

        .addBlankField(true)

        .addField("**!membre**  /  @mention", "Tu veux en savoir plus a propos d'une personne du serveur ? Alors ecrit cette commande.")

        .addBlankField(true)

        .addField("**!report**  / motif / @mention (attention au espace !!!)", "Tu as un problème avec un membres du serveur ? Utilise cette commande au plus vite pour avertir l'administration mais attention a l'utilisé sans abus.")

        .addBlankField(true)

        .addField("Version actuel:", "v 1.01")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532013009-help.png")

        .setFooter("Merci d'être la ! Ritara | " + date);

      message.channel.send(help);

      log(`command : ${message.content}`)

    }

    else if(splitmessage[0] === '!mesinfos'){

      var creadate = ""+ message.member.user.createdAt;
      var joindate = ""+ message.member.joinedAt;

      let mesinfo = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor(message.member.highestRole.color)

        .setTitle('Toutes tes informations')

        .setDescription('Tu avais un doute sur ton profil, laisse moi t\'aider !')

        .addField("Ton pseudo actuel sur le serveur :", message.member.displayName, false)

        .addField("Tu as créé ton compte le :", createDate(creadate), true)

        .addField("Tu nous as rejoins le :", createDate(joindate), true)

        .addField("Ton rôle est :", message.member.highestRole, false)

        .addField("Tu es :", message.member.presence.status, false)

        .setThumbnail(message.member.user.avatarURL)

        .setFooter("Merci d'être la ! Ritara | " + date);

      message.channel.send(mesinfo);

      log(`command : ${message.content}`)

    }

    else if(splitmessage[0] === '!info'){

      var creadate = ""+ message.guild.createdAt;
      var joindate = ""+ message.member.joinedAt;

      let nbChannels = message.guild.channels.array().length;

      let nbroles = message.guild.roles.array().length;

      let info = new Discord.RichEmbed()

        .setTitle('Information Serveur')

        .setDescription(`Description en detail du serveur`)

        .setColor("#ae3fff")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Nom du serveur:', message.guild.name)

        .addField('Localisation:', message.guild.region)

        .addField('Crée le:', createDate(creadate), true)

        .addField('Tu as rejoins le:', createDate(joindate), true)

        .addField('Total de membres:', message.guild.memberCount)

        .addField('Total de channels:', nbChannels)

        .addField('Total de rôles:', nbroles)

        .addField('AFK channel:', message.guild.afkChannel)

        .setFooter("Merci d'être la ! Ritara | " + date);

        message.channel.send(info);

        


      T.get("users/search", {q: 'Ritara_officiel'}, function(err, data, response) {

          console.log(data[0])
          var usernamet = "@" + data[0].screen_name
          var follower = data[0].followers_count
          var langue = data[0].lang
          var photoURL = data[0].profile_image_url
          var location = data[0].location
          var favori = data[0].favourites_count
          var url = "https://twitter.com/" + usernamet

          let tweeter = new Discord.RichEmbed()

                .setAuthor("Carlos Le BOT", bot.user.avatarURL)

                .setURL('https://twitter.com/Ritara_officiel')

                .setColor("#42c5f4")

                .setThumbnail(photoURL)

                .setTitle('Voici les Information de notre Twitter')

                .setDescription('Voici les informations concernant notre twitter n\'hésitez pas allez le follow')

                .addField("Notre Mention","["+usernamet+"]("+ url +")")

                .addField("Follower", ":bird: " +follower, true)

                .addField("Like", ':heart: ' + favori, true)

                .setFooter("Merci d'être la ! Ritara | " + date, 'https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png');

                message.channel.send(tweeter);

                log(`command : ${message.content}`)

      });
    }

    else if(splitmessage[0] === '!membre'){

      if(splitmessage[1]){

        try {

          let userTarget = message.guild.member(message.mentions.users.first());
  
          console.log(userTarget)
          console.log(userTarget.highestRole.color)
  
          var creadate = ""+ userTarget.user.createdAt;
          
          var joindate = ""+ userTarget.joinedAt;
  
          let mesinfo = new Discord.RichEmbed()
  
            .setAuthor("Carlos Le BOT", bot.user.avatarURL)
  
            .setColor(userTarget.highestRole.color)
  
            .setTitle(`Toutes les informations de ${userTarget.displayName}`)
  
            .setDescription(`Tu voulais des infos sur ${userTarget.displayName}!`)
  
            .addField("Son pseudo actuel sur le serveur :", userTarget.displayName, false)
  
            .addField("Il a créé son compte le :", createDate(creadate), true)
  
            .addField("Il nous a rejoins le :", createDate(joindate), true)
  
            .addField("Son rôle est :", userTarget.highestRole, false)
  
            .addField("Il est :", userTarget.presence.status, false)
  
            .setThumbnail(userTarget.user.avatarURL)
  
            .setFooter("Merci d'être la ! Ritara | " + date);
  
          message.channel.send(mesinfo);


          log(`command : ${message.content}`)
  
        }
        catch(error) {

          let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201"**')

          .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

          log(`Erreur : #201`)

          return message.channel.send(erreur);

          console.error(error);
        }

      }else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201"**')

          .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

          console.log("error");

        log(`Erreur : #201`)

        return message.channel.send(erreur);

        

      }

    }

    else if (splitmessage[0] === "!twitter") {

      bot.channels.get('505507727267856385').send(`Commande effectué ` + message + ` par ${message.member} dans ${message.channel} `);

      let twitter = new Discord.RichEmbed()

        .setTitle('**Twitter**')

        .setDescription(`N'oubliez pas d'aller follow notre twitter`)

        .setColor("#42c5f4")

        .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Notre Twitter:', "https://twitter.com/Ritara_officiel")

        .setFooter("Merci d'être la ! Ritara | " + date);

      bot.channels.get('485184306709266436').send(twitter);

      log(`command : ${message.content}`)
    }

    //tiket report
    else if (splitmessage[0] === "!report") {
      
      //on teste la taille du split

      if (splitmessage.length === 3) {

        
        var motif = splitmessage[1];

        var mention = message.mentions.users.first();

        

        if (mention == null) {
          return
        } else {

          let report = new Discord.RichEmbed()

            .setAuthor(message.member.nickname, message.author.avatarURL)

            .setColor("#6f3da5")

            .setTitle('Ticket Report')
            .setDescription(`${message.member} a envoyer un tiket de report contre ${mention} dans le salon ${message.channel}`)

            .addField("Motif du report", motif, true)

            .setFooter("Administreation Ritara | " + message.createdAt);

          message.channel.send(`${message.member} Votre reclamation va être prise en charge`);

          bot.channels.get('505507727267856385').send(report);

          log(`command : ${message.content} avec la mention : ${mention} fait par ${message.author.username}`)


        }

      }
      //erreur pas assez de parametre
      else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201"**')

          .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

          log(`erreur : #201`)

        return message.channel.send(erreur);

        console.log("error");

      }

    }

    else if (splitmessage[0] === '!say') {

      if (splitmessage.length === 3) {

        var msg = splitmessage[1]

        var channel = splitmessage[2]

        bot.channels.get(channel).send(msg);

        log(`command: ${message.content}`)

      } else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201**')

          .addField("Il s'emblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");


          log(`erreur : #201`)

        return message.channel.send(erreur);


      }

    }

    else if(splitmessage[0] === "!kick"){

      if (splitmessage.length === 3) {

        var kmotif = splitmessage[1];
        let kuser = message.guild.member(message.mentions.users.first());

        if (kuser == null) {

          let erreur = new Discord.RichEmbed()

        .setColor("#960d0d")

        .setTitle('**ERREUR #102**')

        .addField("Il semblerait que Carlos rencontre un problème !", "Personne Introuvable")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        console.log("error");

        log("error : #102");

        return message.channel.send(erreur);

        

        }
        else{
          //pas les permisions

          if(!message.member.hasPermission('KICK_MEMBERS')){

            let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #101**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas les permisions !")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

            log("error : #102");

            return message.channel.send(erreur);

            console.log("error");

          }
          //les permisions
          else

          {
            //verif de la personne kick
            if(kuser.hasPermission('KICK_MEMBERS')){

              let erreur = new Discord.RichEmbed()

              .setColor("#960d0d")

              .setTitle('**ERREUR #103**')

              .addField("Il semblerait que Carlos rencontre un problème !", "Imposible de kick cette personne !")

              .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

              log("error : #103");

              return message.channel.send(erreur);

              console.log("error");


            }
            //personne kickable
            else{


              let = kick = new Discord.RichEmbed()

            .setAuthor(message.member.nickname, message.author.avatarURL)

            .setColor("#6f3da5")

            .setTitle('KICK')

            .setDescription(`${message.member} a été expulsé par ${kuser}`)

            .addField("Motif du kick", kmotif, true)

            .setFooter("Administreation Ritara | " + date);

            message.channel.send(`${kuser} a bien été kick par ${message.member} !`);

            bot.channels.get('505507727267856385').send(kick);

            message.guild.member(kuser).kick(kmotif)

            log(`command :  ${message.content}`);

            }

          }
        }
      }
      else

      {

        let erreur = new Discord.RichEmbed()

        .setColor("#960d0d")

        .setTitle('**ERREUR #201**')

        .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        log(`erreur : #201`)

        return message.channel.send(erreur);

      }
    }

    else if(splitmessage[0] === "!ban"){

      if (splitmessage.length === 3) {

        var bmotif = splitmessage[1];
        let buser = message.guild.member(message.mentions.users.first());

        if (buser == null) {

            let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #102**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Personne Introuvable")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

            return message.channel.send(erreur);

            console.log("error");

        }
        else{
          //pas les permisions

          if(!message.member.hasPermission('BAN_MEMBERS')){

            let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #101**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas les permisions !")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

            return message.channel.send(erreur);

            console.log("error");

          }
          //les permisions
          else

          {
            //verif de la personne kick
            if(buser.hasPermission('BAN_MEMBERS')){

              let erreur = new Discord.RichEmbed()

              .setColor("#960d0d")

              .setTitle('**ERREUR #103**')

              .addField("Il semblerait que Carlos rencontre un problème !", "Imposible de ban cette personne !")

              .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

              return message.channel.send(erreur);

              console.log("error");


            }
            //personne banable
            else{

                let = ban = new Discord.RichEmbed()

                .setAuthor(message.member.nickname, message.author.avatarURL)

                .setColor("#6f3da5")

                .setTitle('BAN')
                .setDescription(`${message.member} a été bannis par ${buser}`)

                .addField("Motif du ban", bmotif, true)

                .setFooter("Administreation Ritara | " + date);

                message.channel.send(`${buser} a bien été kick par ${message.member} !`);

                bot.channels.get('505507727267856385').send(ban);

                message.guild.member(buser).ban(bmotif)

                log(`command : ${message.content} , ${buser.user.username} bannis par ${message.author.username}`)

            }

          }
        }
      }
      else

      {

        let erreur = new Discord.RichEmbed()

        .setColor("#960d0d")

        .setTitle('**ERREUR #201**')

        .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        log(`erreur : #201`)

      return message.channel.send(erreur);

      console.log("error");
      

      }
    }
    else if(splitmessage[0] === '!tweet'){

      //tweet search
      searchtweet();
      setInterval(searchtweet, 1000*60*20)

      function searchtweet(){
        T.get('statuses/user_timeline', {screen_name: 'Ritara_officiel', count: 1, exclude_replies: true, include_rts: false}, function(err, data, response) {

          console.log(data[0])

          console.log('tweet find')

          const tweetinfo = [data[0].created_at, data[0].text, data[0].user.screen_name, data[0].retweet_count, data[0].favorite_count]

          let newtweet = new Discord.RichEmbed()

          .setAuthor("Carlos Le BOT", bot.user.avatarURL)

          .setColor("#42c5f4")

          .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")

          .setTitle('Nouveau Tweet sur la page de @'+ tweetinfo[2])

          .setDescription(tweetinfo[1])

          .addField("Retweet", ':arrows_counterclockwise: ' +tweetinfo[3], true)

          .addField("Like", ':heart: ' + tweetinfo[4], true)

          .setFooter("Merci d'être la ! Ritara | " + date )

          .addField("Allez Follow Notre Twitter pour ne rien manquer", '[@Ritara_officiel](https://twitter.com/Ritara_officiel) ');

          bot.channels.get('505506509992624128').send(newtweet);

        });
      }

    }

    else if(splitmessage[0] === '!config'){

      if(message.member.highestRole.name === "President"){

        if(splitmessage.length === 3){

          var param = splitmessage[1];

          var value = splitmessage[2];

          var fs = require('fs');

          if(value == "true" || value == "false"){

          fs.writeFileSync('config.json', '{  "'+param+'" : '+value+' }', 'UTF-8');

          console.log('Update Configuration');

          message.channel.send('La Configuration a été mise a jour avec succes')

          } else

          {
            console.log("error");
            message.channel.send('La Configuration a été intérompu')
          }

        }
        else
        {

          let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201**')

          .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        return message.channel.send(erreur);

        console.log("error");

        }
      }else{

        let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #101**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas les permisions !")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

            return message.channel.send(erreur);

            console.log("error");

      }
    }

    else if(splitmessage[0] === '!invite'){

      if(message.member.hasPermission("ADMINISTRATOR")){
        
      function create(data){
        message.channel.send(`L'invitation a été crée avec le lien : ${data.url} et d'une durée ilimité`)
      }

      console.log(bot.channels.get('505509406578966541').createInvite({maxAge : 0}).then(invitation => create(invitation)    
      ));

      }
      else{

        let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #101**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas les permisions !")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

            console.log("error");

            return message.channel.send(erreur);

            

      }
      
  
    }

    else if(splitmessage[0] === "!clean"){

      message.delete()

          if (splitmessage.length === 3) {

          var query = message.guild.member(message.mentions.users.first());

          var limit = parseInt(splitmessage[2])

          function supmsg(data){

          listemsg = data.array()

          console.log(listemsg)

          var i = 0

          while(i < listemsg.length){
              
            if(listemsg[i].author.id === query.user.id)

              listemsg[i].delete()

              i++

              console.log(i)

              if(i === listemsg.length){

                console.log('clean')
        
              }

            }   

          }

          if(limit != NaN && limit <= 100 && limit > 0){

            console.log(message.channel.fetchMessages({ limit: limit}).then(msg => supmsg(msg)).catch(function(error){
              console.log(error)
            }));

          }
          else{

            console.log("error");
            let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #2001"**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous Imposible de suprimer les messages")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

          return message.channel.send(erreur);

          
          }

        }
        else {

          let erreur = new Discord.RichEmbed()

            .setColor("#960d0d")

            .setTitle('**ERREUR #201"**')

            .addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

            .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

          return message.channel.send(erreur);

          console.log("error");

        }
  }
  else if(splitmessage[0] === '!left'){
    if(message.member.voiceChannel){
    message.member.voiceChannel.leave()
    }
  }
  else if(splitmessage[0] === '!play'){

    if(splitmessage.length === 3){

      var link = splitmessage[1]

      var popo = parseInt(splitmessage[2])/ 100

      const ytdl = require('ytdl-core');

      const streamOptions = { seek: 0, volume: popo };

      if(message.member.voiceChannel){

        message.member.voiceChannel.join()

        .then(connection => {

          const stream = ytdl(link, { filter : 'audioonly', quality: 'highest'});

          const dispatcher = connection.playStream(stream, streamOptions);

        })
        .catch(console.error);
        }
     

    }

  }
    // erreur commande inconue
    else {

      let erreur = new Discord.RichEmbed()

        .setColor("#960d0d")

        .setTitle('**ERREUR #100**')

        .addField("Il semblerait que Carlos rencontre un problème !", "Commande inconue")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

      return message.channel.send(erreur);

      console.log("error");
    }
  }

  var role = message.member.highestRole

  if (message.channel.id === '505509919055937558' && message.author.id != bot.user.id) {

    console.log(role.name)

    if (role.name != 'President') {

      if (role.name != "Sodomite") {

        if (role.name != "Ministres") {

          console.log('je peux repondre')

          message.channel.send(`${message.member} Ta demande va etre prise en compte !`);

          bot.channels.get('505507727267856385').send(`${message.member} A deposer un message dans le salon ${message.channel} !`);
        }
      }
    }
  }

  if(message.channel.id === '505503616308740096' || message.channel.id === '505506374302564372'){

    if(message.author.id != bot.user.id){

      var expresion = /pute|FDP|salope|fils de pute|enculer|juif|arabe|pd|FTG|va te faire foutre|niquer ta mere|bâtard| chienne|ta race| conasse|michto|merdeu|tête de bite/i

      if(message.content.match(expresion)){

        message.channel.send(`${message.member} S'il vous plait surveillez votre language ! :open_mouth: `)
        bot.channels.get('505507727267856385').send(`${message.author.username} a utilisé un mot répertorié, dans le salon : ${message.channel} sont message a bien été suprimé`);
        message.delete();

      }
    }
  }

  if(message.member.highestRole.name === "Assemblée" || message.member.highestRole.name === "Sénateurs" || message.member.highestRole.name === "Amis"){

    if(message.content.match(/discord.gg/)){

      message.channel.send(`${message.member} Il est interdit d'envoyer des publicités concernant d'autre serveur discord !! :kissing_closed_eyes:`);

      bot.channels.get('505507727267856385').send(`${message.author.username} a fait de la pub dans : ${message.channel} sont message a bien été suprimé`);

      message.delete();

      var buser = message.member.bannable

      var bmotif = "Envoi des publicité"

      var fs = require('fs');

      fs.readFile('config.json', 'utf8', function (erreur, donnees){

        var data = JSON.parse(donnees);
        console.log(data.ban)

        if(data.ban == true && buser){
              console.log('ban')
              bmotif = "envoie de la pub cette pute"
              let = ban = new Discord.RichEmbed()

                .setAuthor(message.member.nickname, message.author.avatarURL)

                .setColor("#6f3da5")

                .setTitle('BAN')

                .setDescription(`${message.member} a été bannis`)

                .addField("Motif du ban", bmotif, true)

                .setFooter("Administreation Ritara | " + date);

                message.channel.send(`${buser} a bien été kick par ${message.member} !`);

                bot.channels.get('505507727267856385').send(ban);

                message.guild.member(buser).ban(bmotif)

        }
        else{
              console.log("pas activer")
        }

      });

      console.log(buser)
    }
  }

    function GetSecondeMessage(){

        var char = ""+message.createdAt

        var splitchar = char.split(' ')

        var heure = splitchar[4]

        var splitheure = heure.split(':')

        var seconde = splitheure[2]

        return seconde

    }
    

    var fs = require('fs');

    var usertree = parseInt(fs.readFileSync("usertree.txt", "UTF-8", function(){}));

    var usertwo = parseInt(fs.readFileSync("usertwo.txt", "UTF-8", function(){}));

    var userone = message.author.id

    fs.writeFile('usertwo.txt', userone, function(){})

    fs.writeFile('usertree.txt', usertwo, function(){})
    
    var secmsg3 = parseInt(fs.readFileSync("secmsg3.txt", "UTF-8"));

    var secmsg2 =parseInt(fs.readFileSync("secmsg2.txt", "UTF-8"));

    var secmsg = parseInt(GetSecondeMessage());

    fs.writeFile('secmsg3.txt', secmsg2, function(){})

    fs.writeFile('secmsg2.txt', secmsg, function(){})


    var interval = 2

    if(secmsg <= secmsg2){

      var delay = secmsg2 - secmsg

    }else{

      var delay = secmsg - secmsg2
      
    }  


    if(userone == usertwo && usertwo == usertree && message.author.id != bot.user.id){
      
      if (delay <= interval){

        message.delete()

        message.channel.send(`${message.member} Ca va trop vite calme toi s'il te plait !! :hugging:`)

        message.member.addRole(message.member.guild.roles.find('name', 'SPAM')) 

        var time = 0
          
        var myinterval = setInterval(function(){

          time = time + 1 // seconde
          console.log(time)

          if(time === 3600){

            function findit(role){

              return role.id === '504623083819237396'

            }
            var table = bot.guilds.array() //chercher la guild

            console.log(table)

            var member = table[0].members.array()//tableau membres de ritara

            console.log(member)

            var i = 0

            while(i < member.length){

              var memberRoles = member[i].roles.array()

              if(memberRoles.find(findit)){

                console.log(member[i].user.username)

                member[i].removeRole('504623083819237396')

              }

              i++

            }

            clearInterval(myinterval)
          }
        }, 1000)  
      }

    }
    
});

var stream = T.stream('statuses/filter', {track: 'Ritara'})

var now = new Date()
      var jour = now.getDate()
      if(jour < 10){
        var jour = "0" + jour
      }
      var mois = now.getMonth() + 1
      if(mois < 10){
        var mois = "0" + mois
      }
      var anee = now.getFullYear()

      var hours = now.getHours() + 2
      if(hours < 10){
        var hours = "0" + hours
      }
      var min = now.getMinutes()
      if(min < 10){
        var min = "0" + min
      }
      var date = "Le " + jour + "/" + mois + "/" + anee + " à " + hours + "h" + min

stream.on('tweet', function (tweet) {
  console.log(tweet)
  if(tweet.user.screen_name == "Ritara_officiel"){

    console.log ('Tweet From Ritara')

    let newtweet = new Discord.RichEmbed()

    .setAuthor("Carlos Le BOT", bot.user.avatarURL)

    .setColor("#42c5f4")

    .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")

    .setTitle('Nouveau Tweet sur la page de @'+ tweet.user.screen_name)

    .setDescription(tweet.text)

    .addField("Retweet", ':arrows_counterclockwise: ' +tweet.retweet_count, true)

    .addField("Like", ':heart: ' + tweet.favorite_count, true)

    .setFooter("Merci d'être la ! Ritara | " + date )

    .addField("Allez Follow Notre Twitter pour ne rien manquer", '[@Ritara_officiel](https://twitter.com/Ritara_officiel) ');

    bot.channels.get('505510320949821450').send(newtweet)

  }else{
    console.log ('No Interest')
  }


});


var acti = 0

setInterval(function(){

  if (acti === 1){
    
   // bot.channels.get('469463455154438165').send('pute')
    bot.user.setActivity('!info')
    acti = 0
  }
  else if (acti === 0){
   // bot.channels.get('469463455154438165').send('salope')
    bot.user.setActivity('!help')
    acti = 1
  }
  
}
, 30000 );

function log(data){

  var now = new Date()
      var jour = now.getDate()
      if(jour < 10){
        var jour = "0" + jour
      }
      var mois = now.getMonth() + 1
      if(mois < 10){
        var mois = "0" + mois
      }
      var anee = now.getFullYear()

      var hours = now.getHours() + 2
      if(hours < 10){
        var hours = "0" + hours
      }
      var min = now.getMinutes()
      if(min < 10){
        var min = "0" + min
      }
      var date = "Le " + jour + "/" + mois + "/" + anee + " à " + hours + "h" + min

      var text = '\n        ////       ' + data + '(' + date + ')';

      const fs = require('fs');

      fs.appendFile('logsbot.txt', text , (error)=>{

        if(error) console.log(error)

      })

}

bot.login(process.env.BOT_TOKEN);
