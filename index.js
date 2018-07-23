const Discord = require('discord.js');

var bot = new Discord.Client();

var guild = new Discord.Guild();

const PREFIX = "!";

const good = "Opération effectuée";

bot.on('ready', () => {

    console.log(good);

    bot.user.setActivity('!info');

    bot.channels.get('469463455154438165').send(`Je suis connecté ! :grin:`);

    console.log(bot.user)

});

bot.on('guildMemberAdd', member => {

    try {
        var name = member.user.username;

        console.log(name);

        let role = member.guild.roles.find('name', 'Assemblée');

        bot.channels.get('195917192800239626').send(`Bienvenue sur Ritara, ${member}. Merci de nous avoir rejoins. Bon jeu a toi ! :wink: `);

        member.addRole(role);

        console.log(good);

      }

    catch(error) {

        console.error(error);

        let erreur = new Discord.RichEmbed()

                .setColor("#960d0d")

                .setTitle('**ERREUR**')

                .addField("Il s'emblerait que Carlos rencontre un problème !", "Impossible d'Atribuée l'atribut")
                
                .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

                bot.channels.get('469463455154438165').send(erreur);
        
      }
    

  });

bot.on('channelCreate', channel => {

    try {

        bot.channels.get('469463455154438165').send(`salon cree  avec le nom ${channel} `);

        let botname = bot.user.username;

        var sedate = channel.createdAt;

        let info = new Discord.RichEmbed()

        .setTitle('Information Channel')

        .setDescription(`Nouveau Salon Disponible ${channel}`)

        .setColor("#ae3fff")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

        .setAuthor(botname)

        .setFooter("Merci d'être la ! Ritara | " + sedate);

        bot.channels.get('348070723904077827').send(info);

        console.log(good);

      }
      catch(error) {

        console.error(error);

        let erreur = new Discord.RichEmbed()

                .setColor("#960d0d")

                .setTitle('**ERREUR**')

                .addField("Il s'emblerait que Carlos rencontre un problème !", "Imposible d'envoyer les informations")
                
                .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

                bot.channels.get('469463455154438165').send(erreur);
      }
});


bot.on('message', message => {


  if (message.content[0] === PREFIX) {

    let splitmessage = message.content.split(" / ");

    //commande info

    if (splitmessage[0] === "!info") {

      //log envoyé dans debug

      bot.channels.get('469463455154438165').send(`Commande effectué ` + message + ` par ${message.member} dans ${message.channel} `);

      //let botname = bot.user.username;

      let servname = message.guild.name;

      let servdate = message.guild.createdAt;

      let info = new Discord.RichEmbed()

        .setTitle('Information Serveur')

        .setDescription(`Description en detail du serveur`)

        .setColor("#ae3fff")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/3/1531929812-logio-ch.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Nom du serveur:', servname)

        .addField('Crée le:', servdate)

        .addField('Tu as rejoins le:', message.member.joinedAt)

        .addField('Total de membres:', message.guild.memberCount)

        .setFooter("Merci d'être la ! Ritara | ");

      return message.channel.send(info);

      console.log(good);

    }

    //commande twitter
    else if (splitmessage[0] === "!twitter") {

      bot.channels.get('469463455154438165').send(`Commande effectué ` + message + ` par ${message.member} dans ${message.channel} `);

      let twitter = new Discord.RichEmbed()

        .setTitle('**Twitter**')

        .setDescription(`N'oubliez pas d'aller follow notre twitter`)

        .setColor("#42c5f4")

        .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .addField('Notre Twitter:', "https://twitter.com/Ritara_officiel")

        .setFooter("Merci d'être la ! Ritara | ");

      bot.channels.get('348070723904077827').send(twitter);

      console.log(good);
    }

    //commande membre
    else if (splitmessage[0] === "!membre") {

      //on teste la taille

      console.log(splitmessage.length)

      if (splitmessage.length === 2) {

        mentions = message.mentions.users.first();


        if (mentions == null) {

          return

        } else {

          message.channel.send(`${mentions}`);

          var status = mentions.presence.status;

          var create = mentions.createdAt;

          var avataruser = mentions.avatarURL;

          //var infoserv = mentions.user.guildSettings

          console.log(mentions);

          //console.log(mentions.user.guild)

          var robot = mentions.bot;

          console.log(robot);

          console.log(status)

          //online

          if (status === "online") {

            if (robot === false) {

              let profil = new Discord.RichEmbed()

                .setTitle(`Information Sur **${mentions.username}**`)

                .setDescription(`Description en detail du profil`)

                .setColor("#ffffff")

                .setThumbnail(avataruser)

                .setAuthor("Carlos Le BOT", bot.user.avatarURL)

                .addField('Création du compte:', create)

                .addField('Origine :', "Humaine ( OUF !! :sweat_smile: )")

                .addField('Status :', 'Connecté au serveur')

                .setFooter("Merci d'être la ! Ritara | ");

              message.channel.send(profil)

            } else {
              let profil = new Discord.RichEmbed()

                .setTitle(`Information Sur **${mentions.username}**`)

                .setDescription(`Description en detail du profil`)

                .setColor("#ffffff")

                .setThumbnail(avataruser)

                .setAuthor("Carlos Le BOT", bot.user.avatarURL)

                .addField('Création du compte:', create)

                .addField('Origine :', "Robotique ( FUYEZZZ !! :scream: )")

                .addField('Status :', 'Connecté au serveur')

                .setFooter("Merci d'être la ! Ritara | ");

              message.channel.send(profil)
            }
          }

          if (status === "offline") {

            if (robot === false) {

              let profil = new Discord.RichEmbed()

                .setTitle(`Information Sur **${mentions.username}**`)

                .setDescription(`Description en detail du profil`)

                .setColor("#ffffff")

                .setThumbnail(avataruser)

                .setAuthor("Carlos Le BOT", bot.user.avatarURL)

                .addField('Création du compte:', create)

                .addField('Origine :', "Humaine ( OUF !! :sweat_smile: )")

                .addField('Status :', 'Déconnecté')

                .setFooter("Merci d'être la ! Ritara | ");

              message.channel.send(profil)

            } else {
              let profil = new Discord.RichEmbed()

                .setTitle(`Information Sur **${mentions.username}**`)

                .setDescription(`Description en detail du profil`)

                .setColor("#ffffff")

                .setThumbnail(avataruser)

                .setAuthor("Carlos Le BOT", bot.user.avatarURL)

                .addField('Création du compte:', create)

                .addField('Origine :', "Robotique ( FUYEZZZ !! :scream: )")

                .addField('Status :', 'Déconnecté')

                .setFooter("Merci d'être la ! Ritara | ");

              message.channel.send(profil)
            }
          }
        }




      }

      //erreur pas de parametre
      else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR**')

          .addField("Il s'emblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié de membre")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        return message.channel.send(erreur);

        console.log("error");

      }

    }
    // commande !help
    else if (splitmessage[0] === "!help") {

      let jour = message.createdAt;

      let help = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor("#ae3fff")

        .setTitle('Guide D\'utilisation')

        .addBlankField(true)

        .setDescription('Tu veux en savoir plus sur moi ? Lis mon guide d\'utilisation !')

        .addBlankField(true)

        .addField("**!info**", "Tu veux en savoir plus a propos du serveur ? Alors ecrit cette commande.")

        .addBlankField(true)

        .addField("**!mesinfos**", "Tu veux avoir tes propres infos ? Alors ecrit cette commande.")

        .addBlankField(true)

        .addField("!membre  /  @mention", "Tu veux en savoir plus a propos d'une personne du serveur ? Alors ecrit cette commande.")

        .addBlankField(true)

        .addField("!report  / motif / @mention (attention au espace !!!)", "Tu as un problème avec un membres du serveur ? Utilise cette commande mais attention a l'utilisé sans abus.")

        .addBlankField(true)

        .addField("Les prochaines options disponibles", "Elles arrivent bientôt faut juste que mon dev comprenne comment je marche :wink: .")

        .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532013009-help.png")

        .setFooter("Merci d'être la ! Ritara | " + jour);

      message.channel.send(help);

    }

    // commande !mesinfo
    else if (splitmessage[0] === "!mesinfos") {


      let mesinfo = new Discord.RichEmbed()

        .setAuthor("Carlos Le BOT", bot.user.avatarURL)

        .setColor("#ae3fff")

        .setTitle('Vos Information')

        .setDescription('Tu voulais t\'es infos les voila')

        .addField("Tu as créé ton compte le :", message.member.user.createdAt, true)

        .addField("Tu nous as rejoins le :", message.member.joinedAt, true)

        .addField("Ton rôle est :", message.member.highestRole, false)

        .addField("Ton pseudo actuel sur le serveur :", message.member.nickname, false)

        .setThumbnail(message.member.user.avatarURL)

        .setFooter("Merci d'être la ! Ritara | ");

      message.channel.send(mesinfo);

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

          .setTitle('**ERREUR**')

          .addField("Il s'emblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        return message.channel.send(erreur);

        console.log("error");

      }

    } else if (splitmessage[0] === '!say') {

      if (splitmessage.length === 2) {

        var msg = splitmessage[1]

        bot.channels.get('305345723472543745').send(msg);

      } else {

        let erreur = new Discord.RichEmbed()

          .setColor("#960d0d")

          .setTitle('**ERREUR**')

          .addField("Il s'emblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres, Tips : n'oublier pas de séparer vos paramètres avec : **\'  /  \'** ")

          .setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");

        return message.channel.send(erreur);

        console.log("error");

      }

    } 
    // erreur commande inconue
    else {

      let erreur = new Discord.RichEmbed()

        .setColor("#960d0d")

        .setTitle('**ERREUR**')

        .addField("Il s'emblerait que Carlos rencontre un problème !", "Commande inconue")

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

    var expresion = /pute|FDP|salope|fils de pute|enculer|juif|juifs|arabe|pd/i 

    if(message.content.match(expresion)){

      message.channel.send(`${message.member} S'il vous plait surveillez votre language ! :open_mouth: `)
      bot.channels.get('305345723472543745').send(`${message.author.username} a utilisé un mot répertorié, dans le salon : ${message.channel} sont message a bien été suprimé`);
      message.delete();

    }

  }

});

bot.login(process.env.BOT_TOKEN);
