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

  bot.channels.get('469463455154438165').send(`Je suis connecté ! :grin:`);

  console.log(bot.user)

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

    bot.channels.get('489464956564013057').send(bvn);
    //ajout du role

    member.addRole(role);


  } catch (error) {

    //erreur

    console.error(error);

    let erreur = new Discord.RichEmbed()

      .setColor("#960d0d")

      .setTitle('**ERREUR #500**')

      .addField("Il semblerait que Carlos rencontre un problème !", "Impossible d'Atribuée l'atribut")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

    bot.channels.get('469463455154438165').send(erreur);

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

    bot.channels.get('469463455154438165').send(`salon cree  avec le nom ${channel} `);

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

    bot.channels.get('348070723904077827').send(info);

    console.log(good);

  } catch (error) {

    console.error(error);

    let erreur = new Discord.RichEmbed()

      .setColor("#960d0d")

      .setTitle('**ERREUR #501**')

      .addField("Il semblerait que Carlos rencontre un problème !", "Imposible d'envoyer les informations")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

    bot.channels.get('469463455154438165').send(erreur);
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

      });
    }

    else if(splitmessage[0] === '!membre'){

     

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


    }

    else if (splitmessage[0] === "!twitter") {

      bot.channels.get('469463455154438165').send(`Commande effectué ` + message + ` par ${message.member} dans ${message.channel} `);

      let twitter = new Discord.RichEmbed()

        .setTitle('**Twitter**')

        .setDescription(`N'oubliez pas d'aller follow notre twitter`)

        .setColor("#42c5f4")

        .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Notre Twitter:', "https://twitter.com/Ritara_officiel")

        .setFooter("Merci d'être la ! Ritara | " + date);

      bot.channels.get('485184306709266436').send(twitter);
    }

    //tiket report
    else if (splitmessage[0] === "!report") {

      //on teste la taille du split

      if (splitmessage.length === 3) {

        var motif = splitmessage[1];
        mention = message.mentions.users.first();

        if (mention == null) {
          return
        } else {

          let = report = new Discord.RichEmbed()

            .setAuthor(message.member.nickname, message.author.avatarURL)

            .setColor("#6f3da5")

            .setTitle('Ticket Report')
            .setDescription(`${message.member} a envoyer un tiket de report contre ${mention} dans le salon ${message.channel}`)

            .addField("Motif du report", motif, true)

            .setFooter("Administreation Ritara | " + message.createdAt);

          message.channel.send(`${message.member} Votre reclamation va être prise en charge`);

          bot.channels.get('305345723472543745').send(report);


        }

      }
      //erreur pas assez de parametre
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

    else if (splitmessage[0] === '!say') {

      if (splitmessage.length === 3) {

        var msg = splitmessage[1]

        var channel = splitmessage[2]

        bot.channels.get(channel).send(msg);

      } else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR #201**')

          .addField("Il s'emblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

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

        return message.channel.send(erreur);

        console.log("error");

        }
        else{
          //pas les permisions

          if(!message.member.hasPermission('KICK_MEMBERS')){

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
            if(kuser.hasPermission('KICK_MEMBERS')){

              let erreur = new Discord.RichEmbed()

              .setColor("#960d0d")

              .setTitle('**ERREUR #103**')

              .addField("Il semblerait que Carlos rencontre un problème !", "Imposible de kick cette personne !")

              .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

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

            bot.channels.get('305345723472543745').send(kick);

            message.guild.member(kuser).kick(kmotif)

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

        return message.channel.send(erreur);

        console.log("error");

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

                bot.channels.get('305345723472543745').send(ban);

                message.guild.member(buser).ban(bmotif)

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

          bot.channels.get('485184306709266436').send(newtweet);

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

          fs.writeFileSync('log.txt', "Update Configuration : "+ date+ "\n", 'UTF-8', {'flags': 'a+'});

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

  if (message.channel.id === '348071630309949440' && message.author.id != bot.user.id) {

    console.log(role.name)

    if (role.name != 'President') {

      if (role.name != "Sodomite") {

        if (role.name != "Ministres") {

          console.log('je peux repondre')

          message.channel.send(`${message.member} Ta demande va etre prise en compte !`);

          bot.channels.get('305345723472543745').send(`${message.member} A deposer un message dans le salon ${message.channel} !`);
        }
      }
    }
  }

  if(message.channel.id === '489464956564013057' || message.channel.id === '469463455154438165'){

    if(message.author.id != bot.user.id){

      var expresion = /pute|FDP|salope|fils de pute|enculer|juif|arabe|pd|FTG|va te faire foutre|niquer ta mere|bâtard| chienne|ta race| conasse|michto|merdeu|tête de bite/i

      if(message.content.match(expresion)){

        message.channel.send(`${message.member} S'il vous plait surveillez votre language ! :open_mouth: `)
        bot.channels.get('305345723472543745').send(`${message.author.username} a utilisé un mot répertorié, dans le salon : ${message.channel} sont message a bien été suprimé`);
        message.delete();

      }
    }
  }

  if(message.member.highestRole.name === "Assemblée" || message.member.highestRole.name === "Sénateurs" || message.member.highestRole.name === "Amis"){

    if(message.content.match(/discord.gg/)){

      message.channel.send(`${message.member} Il est interdit d'envoyer des publicités concernant d'autre serveur discord !! :kissing_closed_eyes:`);

      bot.channels.get('305345723472543745').send(`${message.author.username} a fait de la pub dans : ${message.channel} sont message a bien été suprimé`);

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

                bot.channels.get('305345723472543745').send(ban);

                message.guild.member(buser).ban(bmotif)

        }
        else{
              console.log("pas activer")
        }
          
      });

        

                

                //


      console.log(buser)
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

    bot.channels.get('485184306709266436').send(newtweet)

  }else{
    console.log ('No Interest')
  }
});


bot.login(process.env.BOT_TOKEN);
