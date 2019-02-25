//L'utilisation de ce code est interdite sans accord.

//VARIABLES//

var resultdate = ""

var fda = []

var stream = {};

var idconnexion = {};

const Discord = require('discord.js');

var bot = new Discord.Client();

const ytdl = require('ytdl-core')

var Twit = require('twit')

var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
});

const PREFIX = "!";


bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
message.membervoiceChannel.join()
  .then(connection => {
    const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);
  })
  .catch(console.error);
});
