// UTILISATION INTERDITE
//VARIABLE
const got = require('got');
const Discord = require('discord.js');
var bot = new Discord.Client();
const ytdl = require('ytdl-core');
var playlist = []
const fs = require('fs')
var antiSpamData = []
//MAIN


function start(){
    console.log('start')
    bot.on('ready', () => {


        bot.user.setActivity('!info');
           
        console.log(bot.user)

        //SET UP BOT
    
        commands()
        antiSpam()
        antiInsulte()
        antiPub()
        comu(bot)
        //streamTwitter()
        //level()
       // participation()
        welcome()

        var daten = new Date()
        daten = dateChange(daten)
        var msgrun = createEmbedMessage(
            "DEMARAGE TERMINÉ",
            "Info sur le démarage du "+daten.toString().substring(3),
            [
                ["COMMANDES", ":white_check_mark: Démarrées"],
                ["ANTISPAM", ":white_check_mark: Démarré"],
                ["ANTIINSULTE", ":white_check_mark: Démarré"],
                ["ANTIPUB", ":white_check_mark: Démarré"],
                ["STREAM TWITTER", ":white_check_mark: Démarré"],
            ],
            daten
        )
        bot.channels.get('505503616308740096').send(msgrun);
            
      });

    bot.login(process.env.BOT_TOKEN);

}   



function welcome() {
    
    bot.on('guildMemberAdd', member => {
        try { 
          //variable new role
      
          let role = member.guild.roles.find('name', 'Assemblée');
      
          //message de bienvenue
      
          let bvn = new Discord.RichEmbed()
      
            .setTitle('Un nouveau membre a rejoins le serveur !')
      
            .setDescription(`Bienvenue sur Ritara ${member}, Merci de nous avoir rejoins. Bon jeu a toi !`)
      
            .setColor("#ae3fff")
      
            .setThumbnail(member.user.avatarURL)
      
            .setAuthor("Carlos Le BOT", bot.user.avatarURL)
      
            .setFooter("Merci d'être la ! Ritara | " +dateChange(member.joinedAt));
      
          bot.channels.get('505506374302564372').send(bvn);
          //ajout du role
      
          member.addRole(role);
        // refreh levelpoint
         // level()
        } catch (error) {
      
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

}

function comu(bot){
    console.log('e');
    
    bot.on('raw', e =>{
        //Ajout de communauté
        if (e.t == "MESSAGE_REACTION_ADD") {
            var channel = e.d.channel_id
            var emoji = e.d.emoji
            var guild = e.d.guild_id
            var user = e.d.user_id
            guild = bot.guilds.find('id', guild);
            user = guild.members.find('id', user)
            if (channel == '608229132710445095') {
                
                if (emoji.name == "🕹") {

                    console.log('joueurs');
                    user.addRole('608242952858370054')
                    
                }else if(emoji.name == "🎨"){
    
                    console.log('artistes');
                    user.addRole('608231533572259861')
                    
                }else if(emoji.name == "💻"){
                    console.log('dev');
                    user.addRole('608223115104878613')
                }

            }
            
            
        }
        //Supression de comunauté
        if (e.t == "MESSAGE_REACTION_REMOVE") {
            var channel = e.d.channel_id
            var emoji = e.d.emoji
            var guild = e.d.guild_id
            var user = e.d.user_id
            guild = bot.guilds.find('id', guild);
            user = guild.members.find('id', user)
            if (channel == '608229132710445095') {
                
                if (emoji.name == "🕹") {

                    console.log('joueurs');
                    user.removeRole('608242952858370054')
                    
                }else if(emoji.name == "🎨"){
    
                    console.log('artistes');
                    user.removeRole('608231533572259861')
                    
                }else if(emoji.name == "💻"){
                    console.log('dev');
                    user.removeRole('608223115104878613')
                }

            }
            
            
        }

    });
}


function commands(){
    
    const prefix = "!"
    bot.on('message', message => {

        var memberid = message.member.id
        if(memberid != bot.user.id){
            fetchMembers(memberid, message)
        }

        if(message.content[0] == prefix){

            var command = message.content.substr(1).split(' / ')
            var date = dateChange(message.createdAt)
            if(command[0] == "info"){
                
                commandInfo(message, date)
                
            }else if(command[0] == "help"){

                commandHelp(message, date)

            }else if(command[0] == "mesinfos"){
                
                commandmyinfo(message, date)

            }else if(command[0] == 'membre'){

                if(command[1]){
                    let mention = message.guild.member(message.mentions.users.first())
                    try{
                        commandmember(message, mention,date)
                    }
                    catch(e){
                        error(message, 208)
                    }
                }else{
                    error(message, 201)
                }
            }else if(command[0] == "report"){

                if(command[2]){

                    var motif = command[1];
                    var mention = message.mentions.users.first();

                    if(mention){

                        var reportTicket = createEmbedMessage(
                            'Ticket Report',
                            `${message.member} a envoyer un tiket de report contre ${mention} dans le salon ${message.channel}`,
                            [
                                ["Motif du report", motif, true]
                            ],
                            date,
                            "#6f3da5"
                        )
                        reportTicket.setAuthor(message.author.username , message.author.avatarURL)
                        message.channel.send(`${message.member} Votre reclamation va être prise en charge`);
                        bot.channels.get('505507727267856385').send(reportTicket);

                    }else{
                        error(message, 208)
                    }
                }else{
                    error(message, 201)
                }
            }else if(command[0] == "say"){
                if(message.member.hasPermission('ADMINISTRATOR')){
                    if(command[2]){
                        var msg = command[1]
                        var channel = command[2]
                        commandSay(message,msg, channel,date)
                    }else{
                        error(message, 201)
                    }
                }else{
                    error(message, 101)
                }
            }else if(command[0] == 'invite'){
                if(message.member.hasPermission("ADMINISTRATOR")){

                    function create(data){
                        message.channel.send(`L'invitation a été crée avec le lien : ${data.url} et d'une durée ilimité`)
                      }
                    console.log(bot.channels.get('505509406578966541').createInvite({maxAge : 0}).then(invitation => create(invitation)    
                    ));

                }else{
                    error(message, 101)
                }
            }else if(command[0] == 'clean'){
                message.delete()
                if(command[2]){

                    var query = message.guild.member(message.mentions.users.first());
                    var limit = parseInt(command[2])

                    if(limit != NaN && limit <= 100 && limit > 0){

                        suppmsg(message, date, limit, query)
                        
                    }else{
                        error(message, 2001)
                    }
                }
            }else if(command[0] == 'play'){

                addvideo(command, message)  
        
            }else if(command[0] == "skip"){
                
                playlist.splice(0,1)
                console.log(bot.voiceConnections.array().length);
                if(bot.voiceConnections.array().length){
                    message.channel.send("**:arrows_counterclockwise: MUSIQUE SUIVANTE**")
                    if(playlist.length >= 1){
                        play(bot.voiceConnections.array()[0],message)
                    }else{
                        message.channel.send('**:no_entry_sign: AUCUNE MUSIQUE DANS LA PLAYLIST **')
                    }
                }else{
                    error(message, 1001)
                }
                message.delete()
            }else if(command[0] == "queue"){
        
                var length = playlist.length
                if(length != 0){
                    message.channel.send("**:arrows_counterclockwise: PLAYLIST**")
                    var i= 0
                    var date = dateChange(message.createdAt)
                    while(i<length){
                        var name = playlist[i].name
                        var time = playlist[i].time
                        var url = playlist[i].url
                        var volume = playlist[i].volume
                        var msgl = createEmbedMessage(
                            name,
                            'Position n°'+(i+1),
                            [
                                ['Temps de la vidéo',time],
                                ['Lien YT',url]
                            ],
                            date
                        )
                        msgl.author.name = playlist[i].author
                        msgl.author.icon_url = playlist[i].avatar
                        msgl.setThumbnail(playlist[i].image)
                        message.channel.send(msgl)
                        i=i+1
                    }
                }else{
                    message.channel.send('**:no_entry_sign: AUCUNE MUSIQUE DANS LA LISTE **')
                }
                message.delete()
        
            }else if(command[0] == "left"){
        
                if(message.member.voiceChannel){
                    playlist = []
                    bot.voiceConnections.deleteAll()
                    message.member.voiceChannel.leave()
                    message.channel.send('\n**:mute:  DECONNEXION REUSSIE !**')
                    message.delete()
                }
        
            }
            else if(command[0] == "blague"){
                var rand = Math.floor(Math.random() * (115 - 1 +1)) + 1;
                console.log(rand);
                
                got('https://bridge.buddyweb.fr/api/blagues/blagues/'+ rand).then(data => {
                    var blague = JSON.parse(data.body).blagues
                    
                    var bmaguemsg =createEmbedMessage(
                        "Blague",
                        "Tu mas demandé une blague en voila une",
                        [
                            ["La blague:", blague]
                        ],
                        dateChange(message.createdAt)
                    )
                    message.channel.send(bmaguemsg)
                })


            }else{
                error(message, 101)
            }
        } 
    })
}

function antiSpam(){

    bot.on('message', message => { 
        const interval = 5

        if(antiSpamData[1]){
            var oldmsg = antiSpamData[0]
            var oldmsg1 = antiSpamData[1]
            antiSpamData = []
            antiSpamData.push(message)
            antiSpamData.push(oldmsg)
            antiSpamData.push(oldmsg1)
        }
        if(antiSpamData[0] && antiSpamData.length == 1){
            var oldmsg = antiSpamData[0]
            antiSpamData = []
            antiSpamData.push(message)
            antiSpamData.push(oldmsg)

        }
        if(antiSpamData[0] == undefined){
            antiSpamData.push(message)
        } 
        if(antiSpamData[2]){
            if(antiSpamData[0].author.id == antiSpamData[1].author.id && antiSpamData[0].author.id == antiSpamData[2].author.id &&antiSpamData[1].author.id != bot.user.id){
                var secondLast =  antiSpamData[0].createdAt.getUTCSeconds()
                var secondfirst = antiSpamData[1].createdAt.getUTCSeconds()
                if(secondLast < secondfirst){
                    secondLast = secondLast + 60
                }
                var diference = secondLast - secondfirst
                if(diference < interval){
                    message.member.addRole('504623083819237396') //CHANGER
                    var i = 0

                    function wait(){
                        i = i+1
                        if(i==60){
                            members = antiSpamData[0].guild.members.array();
                            var o = 0
                            while(o<members.length){
                                members[o].removeRole('504623083819237396') //CHANGER
                                o=o+1
                            }
                            clearInterval(waitd)  
                            console.log('REMOVE SUCCESFULL');
                        }
                    }
                    message.channel.send(`**${message.member} Pas si vite, Calme toi ! :zipper_mouth:**`)
                    console.log('SPAM FOR ' + message.member.user.username);
                    message.delete()
                    var waitd = setInterval(wait,60000)
                }
            }
        }
    })

}

function antiInsulte(){

    var dictionaire = ['pute','salope','fdp','enculer','nique ta mere','pd','tg','ta gueule','bouffon','conasse','connard','bougnoule','batard','va te faire foutre','juif','arabe','michto','tete de bite','ftg']
    var i = 0
    var length = dictionaire.length
    while(i< length){
        dictionaire.push(dictionaire[i][0].toUpperCase()+dictionaire[i].substring(1))
        dictionaire.push(" "+dictionaire[i][0].toUpperCase()+dictionaire[i].substring(1)+" ")
        dictionaire.push(dictionaire[i].toUpperCase())
        dictionaire.push(" "+dictionaire[i].toUpperCase()+" ")
        dictionaire.push(" "+dictionaire[i]+" ")
        i++
    }
    
    bot.on('message', message => { 
        var content = message.content
        var i = 0
        if(!message.member.hasPermission('VIEW_AUDIT_LOG')){
            while(i<dictionaire.length){
                if(content.indexOf(dictionaire[i]) != -1){
                    message.member.addRole('504623083819237396') //CHANGER
                        var o = 0

                        function wait(){
                            o = o+1
                            if(o==60){
                                members = antiSpamData[0].guild.members.array();
                                var j = 0
                                while(j<members.length){
                                    members[j].removeRole('504623083819237396') //CHANGER
                                    j=j+1
                                }
                                clearInterval(waitd)  
                                console.log('REMOVE SUCCESFULL');
                                
                            }
                        }
                        message.channel.send(`**${message.member} SURVEILLE TON LANGUAGE ! :zipper_mouth:**`)
                        console.log('SPAM FOR ' + message.member.user.username);
                        message.delete()
                        var waitd = setInterval(wait,60000)
                }
                i++
            }
        }
    })

}

/*function participation(){

    var http = require('http');
    var url = require('url');

    var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/participate.php') {
        var data = url.parse(req.url, true).query
        var user = data.name
        var id = data.id
        var user = user.replace('--', '#')
        var daten = new Date()
        daten = dateChange(daten)
        console.log({user, id});
        var members = bot.guilds.array()[0].members.array()
        var i =0
        var stade = true
        while(i<members.length){
            if (user == members[i].user.tag) {
                var member = members[i].user
                console.log(member);
                member.createDM().then(function(dmChannel){
                    var participationticket = createEmbedMessage(
                        'Participation',
                        `${member} vous participer désormais a l'evenement ${id}`,
                        [
                            ["Evenement", id],
                        ],
                        daten,
                    )
                    dmChannel.send(participationticket)
                })
                res.writeHead(301,
                    {Location: 'http://localhost/ritaraev/events.html'}
                );
                res.end();
                stade = false
                break
            }
            i++
        }
        if (stade) {
            console.log('error');
            res.writeHead(301,
                {Location: 'http://localhost/ritaraev/events.html'}
            );
            res.end();
        }
    }
    });
    server.listen(8080);

}*/


function antiPub(){
    bot.on('message', message => { 
        if(message.content.indexOf('discord.gg') != -1){
            // CHANGER bot.channels.get('505507727267856385').send(`${message.author.username} a fait de la pub dans : ${message.channel} sont message a bien été suprimé`);
            message.member.addRole('504623083819237396') //CHANGER
            var o = 0

            function wait(){
                o = o+1
                if(o==60){
                    members = antiSpamData[0].guild.members.array();
                    var j = 0
                    while(j<members.length){
                        members[j].removeRole('504623083819237396') //CHANGER
                        j=j+1
                    }
                    clearInterval(waitd)  
                    console.log('REMOVE SUCCESFULL');
                    
                }
            }
            message.channel.send(`**${message.member} PAS DE PUB ICI ! :zipper_mouth:**`)
            console.log('SPAM FOR ' + message.member.user.username);
            message.delete()
            var waitd = setInterval(wait,60000)

        }
    })
}

function fetchMembers(mbid, message){
    fs.readFile('guildMembers.txt','utf-8', function(e,data){
        if(data){
            var membersSaved = data.split('\n');
            var i = 0
            while(i<membersSaved.length){
                membersSaved[i] =membersSaved[i].split(',')
                i++
            }
            var i = 0
            while(i<membersSaved.length){
                if(parseInt(mbid) == parseInt(membersSaved[i][0])){
                    membersSaved[i][1] = parseInt(membersSaved[i][1])+1
                }
                i++
            }

            var guild = bot.guilds.array()[0]
            var members = guild.members.array()
            var i = 0 
            while(i<membersSaved.length){
                var idmember = membersSaved[i][0]
                var pointmember = parseInt(membersSaved[i][1])
                
                if(pointmember >= 20){
                    
                    var o = 0
                    while(o<members.length){
                        if(parseInt(members[o].id) == parseInt(idmember)){                            
                            var roles = members[o].roles.array()
                            var l = 0
                            var don = true
                            while(l<roles.length){
                                if(roles[l].id == '349289089293484035'){
                                    don = false
                                    break
                                }else{
                                    don = true
                                }
                                l++
                            }
                            
                            
                            if(don){
                                members[o].addRole('349289089293484035')
                                message.channel.send(`**BRAVO ${members[o]} Tu es desormais sénateurs !! :wink:**`)
                            }
                            
                            break
                        }
                        o++
                    }
                }
                i++
            }

            writeData(membersSaved)
            
        }
    })
}

function writeData(membersSaved){

    var i = 0
    while(i<membersSaved.length){
        membersSaved[i] = membersSaved[i].join(',')
        i++
    }
    membersSaved = membersSaved.join('\n')
    fs.writeFile('guildMembers.txt', membersSaved, function(e){
        if (e) {
            console.log(e);
        }
    })
}

/*function level(){

    var guild = bot.guilds.array()[0]
    var members = guild.members.array()
    var i = 0
    fs.readFile('guildMembers.txt','utf-8', function(e,data){
        if(data){
            var membersSaved = data.split('\n');
            var i = 0
            while(i<membersSaved.length){
                membersSaved[i] =membersSaved[i].split(',')
                i++
            }
            
            
            var i = 0 
            while(i<members.length){

                var o = 0
                var exist = undefined

                while(o<membersSaved.length && exist != 1){

                    if(parseInt(members[i].id) == parseInt(membersSaved[o][0])){
                        exist = 1
                    }else{
                        exist = 0
                    }

                    o++
                }

                if(exist != 1){
                        
                    membersSaved.push([members[i].id,0])
                }

                i++
            }
           
            
            var i = 0
            while(i<membersSaved.length){
                membersSaved[i][0] = parseInt(membersSaved[i][0])
                membersSaved[i][1] = parseInt(membersSaved[i][1])
                i++
            }
            
            writeData(membersSaved)



        }
    }) 
}
*/
/*function streamTwitter(){

    var Twit = require('twit')

    var T = new Twit({
        consumer_key:         process.env.consumer_key,
        consumer_secret:      process.env.consumer_secret,
        access_token:         process.env.access_token,
        access_token_secret:  process.env.access_token_secret,
      });

    var stream = T.stream('statuses/filter', {track: 'Ritara'})

    stream.on('tweet', function (tweet) {

        if(tweet.user.screen_name == "Ritara_officiel"){

            let newtweet = new Discord.RichEmbed()
            .setAuthor("Carlos Le BOT", bot.user.avatarURL)
            .setColor("#42c5f4")
            .setThumbnail("https://ressources.blogdumoderateur.com/2013/03/twitter-logo-240x240.png")
            .setTitle('Nouveau Tweet sur la page de @'+ tweet.user.screen_name)
            .setDescription(tweet.text)
            .addField("Retweet", ':arrows_counterclockwise: ' +tweet.retweet_count, true)
            .addField("Like", ':heart: ' + tweet.favorite_count, true)
            .setFooter("Merci d'être la ! Ritara | " + heure() )
            .addField("Allez Follow Notre Twitter pour ne rien manquer", '[@Ritara_officiel](https://twitter.com/Ritara_officiel) ');
            
            bot.channels.get('505510320949821450').send(newtweet)

        }
    });
}*/

async function addvideo(c, message){
    var url = c[1]
    var volume = parseInt(c[2])/100
    var data =  await ytdl.getInfo(url)
    var avatar = data.author.avatar
    var name = data.title
    var author = data.author.name
    var image = data.thumbnail_url
    var time = data.length_seconds
    var seconde = data.length_seconds%60
    var min = Math.round(parseInt(data.length_seconds/60))
    var time = `${min}:${seconde}`
    var video = {
        name:name,
        url : url,
        time : time,
        avatar : avatar,
        author : author,
        image : image,
        volume: volume,
        msg : message
    }
    playlist.push(video)
    if(playlist.length == 1){
        connexion(message)
    }else{
        message.delete()
        message.channel.send(`**:white_check_mark: MUSIQUE AJOUTÉE AVEC SUCCES**`)
    }
    
}

function play(connexion, message){
    var name = playlist[0].name
    var time = playlist[0].time
    var url = playlist[0].url
    var date = dateChange(playlist[0].msg.createdAt)
    var msgl = createEmbedMessage(
        name,
        'En Écoute...',
        [
            ['Temps de la vidéo',time],
            ['Lien YT',url]
        ],
        date
    )
    msgl.author.name = playlist[0].author
    msgl.author.icon_url = playlist[0].avatar
    msgl.setThumbnail(playlist[0].image)
    playlist[0].msg.channel.send(msgl)
    playlist[0].msg.delete()
    
    var volume =  playlist[0].volume
    const ytdl = require('ytdl-core-discord');
    
    async function start(connection, url) {
      connection.playOpusStream(await ytdl(url));
    }
    
    start(connexion, playlist[0].url) 
    console.log('Done')

}

function connexion(message, data){

    if(message.member.voiceChannel){
        message.member.voiceChannel.join().then(connexion => {
            play(connexion, message)
        })
    }else{
        error(message, 1001)
    }
    message.channel.send('**:loud_sound: CONNEXION REUSSIE !**')
}   

function suppmsg(message, date, limit, query){

    console.log(query.id)

    message.channel.fetchMessages({limit: limit}).then(messages =>{
        messages = messages.array()
        var i = 0
        while(i<messages.length){
            if(query.id == messages[i].author.id){
                messages[i].delete()
            }
            i=i+1
        }
    })
}

function commandInfo(message, date){
    //VARIABLE
    var name = message.guild.name
    var join = dateChange(message.guild.joinedAt)
    var created = dateChange(message.guild.createdAt)
    var memberCount = message.guild.memberCount
    var roles = message.guild.roles.size
    //CREATION DU MSG
    var infoMessage = createEmbedMessage(
        "INFORMATION SUR LE SERVEUR",
        "Description en detail du serveur",
        [
            ['Nom du serveur:', name],
            ['Localisation:',message.guild.region],
            ['Crée',created, true],
            ['Tu as rejoins',join, true],
            ['Total de membres:', memberCount],
            ['Total de channels:', message.guild.channels.array().length],
            ['Total de rôles:', message.guild.roles.array().length],
            ['AFK channel:', message.guild.afkChannel]
        ],
        date
        )
    //ENVOI DU MSG
    console.log(infoMessage);
    message.reply(infoMessage)
}

function commandSay(messagedata,msg,channel, date){
    
    var msg = msg.split('---')

    if(msg.length == 1){

        bot.channels.get(channel).send(msg[0]);

    }else{

        var fields = []
        var i = 0
        while(i<msg.length){
            var line  = msg[i].split(',')
            fields.push(line)
            i=i+1
        }
        var msgembed = createEmbedMessage(
            "Message Personalisé:",
            "\n",
            fields,
            date
        )

        bot.channels.get(channel).send(msgembed);
    }                     
}

function commandHelp(message, date){
    var helpmsg = createEmbedMessage(
        'Guide D\'utilisation',
        'Tu veux en savoir plus sur mon fonctionement ? Lis mon guide d\'utilisation dès maintenant !',
        [
            ["**!info**", "En utlisant cette commande tu auras toutes les infos concernant le serveur et de notre twitter (**MIS A JOUR V 0.03**)"],
            ["**!mesinfos**", "Un petit doute sur ton profil ? N'hésite pas a utliser !mesinfos"],
            ["**!membre**  /  @mention", "Tu veux en savoir plus a propos d'une personne du serveur ? Alors ecrit cette commande."],
            ["**!report**  / motif / @mention (attention au espace !!!)", "Tu as un problème avec un membres du serveur ? Utilise cette commande au plus vite pour avertir l'administration mais attention a l'utilisé sans abus."],
            ["**!play / Youtube URL / Volume ** (entre 1 et 100) (attention au espace !!!)", "Envie d'ecouter une vidéo ou une musique attention il faut que tu sois dans un salon"],
            ["**!left**", "Le bot quitte le salon"],
            ["Version actuel:", "v 1.13"]
        ],
        date,
        undefined,
        1
    )
    helpmsg.setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532013009-help.png")
    //ENVOI DU MSG
    console.log(helpmsg);
    message.reply(helpmsg)
}

function commandmyinfo(message, date){
    var join = dateChange(message.guild.joinedAt)
    var created = dateChange(message.guild.createdAt)
    var mesinfomsg = createEmbedMessage(
        'Toutes tes informations',
        'Tu avais un doute sur ton profil, laisse moi t\'aider !',
        [
            ["Ton pseudo actuel sur le serveur :", message.member.displayName, false],
            ["Tu as créé ton compte le :", created, true],
            ["Tu nous as rejoins le :", join, true],
            ["Ton rôle est :", message.member.highestRole, false],
            ["Tu es :", message.member.presence.status, false],
        ],
        date,
        message.member.highestRole.color
    )
    mesinfomsg.setThumbnail(message.member.user.avatarURL)
    //ENVOI DU MSG
    console.log(mesinfomsg);
    message.reply(mesinfomsg)
}

function commandmember(message,userTarget, date){

    var creadate = dateChange(userTarget.user.createdAt)       
    var joindate = dateChange(userTarget.joinedAt)
    var membermsg = createEmbedMessage(
        `Toutes les informations de ${userTarget.displayName}`,
        `Tu voulais des infos sur ${userTarget.displayName}!`,
        [
            ["Son pseudo actuel sur le serveur :", userTarget.displayName, false],
            ["Il a créé son compte le :", creadate, true],
            ["Il nous a rejoins le :", joindate, true],
            ["Son rôle est :", userTarget.highestRole, false],
            ["Il est :", userTarget.presence.status, false],
        ],
        date,
        userTarget.highestRole.color
    )
    membermsg.setThumbnail(userTarget.user.avatarURL)
    //ENVOI
    console.log(membermsg);
    message.reply(membermsg)
}

function dateChange(date){

    var day = date.getDate()
    var month = date.getMonth()
    if(parseInt(day) < 10){
        day = '0'+day
    }
    if(parseInt(month) < 10){
        month = '0'+month
    }
    var years = date.getFullYear()
    var hours = parseInt(date.getHours())+2
    
    if(hours == 24){
        hours = 0
    }else if(hours == 25){
        hours = 1
    }

    if(hours< 10){
        hours = '0'+hours
    }

    var min = date.getMinutes()
    if(parseInt(min) < 10){
        min = '0'+min
    }
    var date = `Le ${day}/${month}/${years} à ${hours}h${min}`
    return date
}

function createEmbedMessage(title, description, fieldsContent, date, color, saut){
    let embedmessage = new Discord.RichEmbed()
    embedmessage.title = title
    embedmessage.description = description
    embedmessage.setFooter("Merci d'être la ! Ritara | "+date)
    embedmessage.setAuthor("Carlos Le BOT")
    embedmessage.author.icon_url= bot.user.avatarURL
    if(color == undefined || color == 0){
        embedmessage.setColor("#ae3fff")
    }else{
        embedmessage.setColor(color)
    }
    var i = 0 
    while (i<fieldsContent.length){
        if(fieldsContent[i][2]){
            embedmessage.addField(fieldsContent[i][0],fieldsContent[i][1], fieldsContent[i][2])
            if(saut){
            embedmessage.addBlankField(true)
            }
        }else{
            embedmessage.addField(fieldsContent[i][0],fieldsContent[i][1])
            if(saut){
                embedmessage.addBlankField(true)
                }
        }
        i = i +1
    }
    return embedmessage
    
}

function error(msg, code){

    let embedmessage = new Discord.RichEmbed()
    embedmessage.title = `**ERREUR #${code}**`
    embedmessage.setColor("#960d0d")
    var date = dateChange(msg.createdAt)
    embedmessage.setThumbnail("https://image.noelshack.com/fichiers/2018/29/4/1532001002-erreur.png");
    
    if(code == 201){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas specifié assez de paramètres")
        console.error(date+` | ERROR ${code}:  PAS ASSEZ DE PARAMETRE`)
    }else if(code == 208){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Utilisateur introuvable !")
        console.error(date+` | ERROR ${code}:  Utilisateur introuvable`)
    }else if(code == 101){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Vous n'avez pas les permisions !")
        console.error(date+` | ERROR ${code}:  Pas les perms`)
    }else if(code == 2001){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Imposible de suprimer les messages ! (lim => 100)")
        console.error(date+` | ERROR ${code}:  Imposible de suprimer les messages`)
    }else if(code == 1001){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Imposible de se connecter a un salon vocal")
        console.error(date+` | ERROR ${code}:  pas de salon`)
    }else if(code == 101){
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Commande Inconnue")
        console.error(date+` | ERROR ${code}:  commande inconnue `)
    }
    else{
        embedmessage.addField("Il semblerait que Carlos rencontre un problème !", "Erreur Inopinée")
        console.error(date+` | ERROR ${code}:  Erreur Inopinée`)
    }
    msg.channel.send(embedmessage)
    
    return embedmessage
}
console.log('start')
start()

function autoPlay(){
    if(bot.voiceConnections.array()[0]){
        if(bot.voiceConnections.array()[0].speaking != true){
            if(playlist.length > 1){
                playlist.splice(0,1)
                play(bot.voiceConnections.array()[0])
            }else{
                bot.voiceConnections.deleteAll()
                playlist[0].msg.member.voiceChannel.leave()
                playlist[0].msg.channel.send('\n**:mute:  DECONNEXION REUSSIE !**')
                playlist = []
            }
        }
    }
    
}
setInterval(autoPlay, 10000)
