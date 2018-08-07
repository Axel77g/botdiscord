const Discord = require('discord.js');

var bot = new Discord.Client();

const PREFIX = "!";

bot.on('ready', () => {


  bot.user.setActivity('!info');

  bot.channels.get('469463455154438165').send(`Je suis connecté ! :grin:`);

  console.log(bot.user)

});


//evenement Nouveau membre

bot.on('guildMemberAdd', member => {

  try {
    var name = member.user.username;

    console.log(name);

    //variable new role

    let role = member.guild.roles.find('name', 'Assemblée');

    //message de bienvenue

    bot.channels.get('195917192800239626').send(`Bienvenue sur Ritara, ${member}. Merci davoir rejoins. Bon jeu a toi !`);

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

    bot.channels.get('469463455154438165').send(`salon cree  avec le nom ${channel} `);

    let botname = bot.user.username;

    var sedate = channel.createdAt;

    let info = new Discord.RichEmbed()

      .setTitle('Information Création de Channel')

      .setDescription(`Nouveau Salon Disponible ${channel}`)

      .addBlankField(true)

      .addField("Nom du salon", `${channel}`)

      .addBlankField(true)

      .addField("Type du salon",channel.type)

      .setColor("#ae3fff")

      .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

      .setAuthor(botname)

      .setFooter("Merci d'être la ! Ritara | " + sedate);

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

//event message

bot.on('message', message => {

    let date = message.createdAt
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

        .addField("**!info**", "En utlisant cette commande tu auras toutes les infos concernant le serveur")

        .addBlankField(true)

        .addField("**!mesinfos**", "Un petit doute sur ton profil ? N'hésite pas a utliser !mesinfos")

        .addBlankField(true)

        .addField("**!membre**  /  @mention", "Tu veux en savoir plus a propos d'une personne du serveur ? Alors ecrit cette commande.")

        .addBlankField(true)

        .addField("**!report**  / motif / @mention (attention au espace !!!)", "Tu as un problème avec un membres du serveur ? Utilise cette commande au plus vite pour avertir l'administration mais attention a l'utilisé sans abus.")

        .addBlankField(true)

        .addField("Version actuel:", "v 0.02")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532013009-help.png")

        .setFooter("Merci d'être la ! Ritara | " + date);

      message.channel.send(help);

    }

    else if(splitmessage[0] === '!mesinfos'){

      let mesinfo = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor("#ae3fff")

        .setTitle('Toutes tes informations')

        .setDescription('Tu avais un doute sur ton profil, laisse moi t\'aider !')

        .addField("Ton pseudo actuel sur le serveur :", message.member.displayName, false)

        .addField("Tu as créé ton compte le :", message.member.user.createdAt, true)

        .addField("Tu nous as rejoins le :", message.member.joinedAt, true)

        .addField("Ton rôle est :", message.member.highestRole, false)

        .addField("Tu es :", message.member.presence.status, false)

        .setThumbnail(message.member.user.avatarURL)

        .setFooter("Merci d'être la ! Ritara | " + date);

      message.channel.send(mesinfo);

    }

    else if(splitmessage[0] === '!info'){

      let nbChannels = message.guild.channels.array().length;

      let nbroles = message.guild.roles.array().length;

      let info = new Discord.RichEmbed()

        .setTitle('Information Serveur')

        .setDescription(`Description en detail du serveur`)

        .setColor("#ae3fff")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Nom du serveur:', message.guild.name)

        .addField('Nom du serveur:', message.guild.region)

        .addField('Crée le:', message.guild.createdAt)

        .addField('Tu as rejoins le:', message.member.joinedAt)

        .addField('Total de membres:', message.guild.memberCount)

        .addField('Total de channels:', nbChannels)

        .addField('Total de rôles:', nbroles)

        .addField('AFK channel:', message.guild.afkChannel)

        .setFooter("Merci d'être la ! Ritara | " + date);

        message.channel.send(info);

    }

    else if(splitmessage[0] === '!membre'){

      let userTarget = message.guild.member(message.mentions.users.first());

      console.log(userTarget)
      
      let mesinfo = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor("#ae3fff")

        .setTitle(`Toutes les informations de ${userTarget.displayName}`)

        .setDescription(`Tu voulais des infos sur ${userTarget.displayName}!`)

        .addField("Son pseudo actuel sur le serveur :", userTarget.displayName, false)

        .addField("Il a créé son compte le :", userTarget.user.createdAt, true)

        .addField("Il nous a rejoins le :", userTarget.joinedAt, true)

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

      bot.channels.get('348070723904077827').send(twitter);
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

            .setFooter("Administreation Ritara | " + message.createdAt);

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

                .setFooter("Administreation Ritara | " + message.createdAt);

                message.channel.send(`${buser} a bien été kick par ${message.member} !`);

                bot.channels.get('305345723472543745').send(ban);

                message.guild.member(buser).kick(bmotif)

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

  if(message.channel.id === '195917192800239626' || message.channel.id === '469463455154438165'){

    if(message.author.id != bot.user.id){

      var expresion = /pute|FDP|salope|fils de pute|enculer|juif|arabe|pd|FTG|va te faire foutre|niquer ta mere|bâtard| chienne|ta race| conasse|michto|merdeu|tête de bite/i 

      if(message.content.match(expresion)){

        message.channel.send(`${message.member} S'il vous plait surveillez votre language ! :open_mouth: `)
        bot.channels.get('305345723472543745').send(`${message.author.username} a utilisé un mot répertorié, dans le salon : ${message.channel} sont message a bien été suprimé`);
        message.delete();

      }
    }
  }

});


bot.login(process.env.BOT_TOKEN);
