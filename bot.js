
import * as messageFunctions from './data/messageFunctions';
import * as funStuff from './data/funStuff';
import * as config from './data/config.json';

const schedule = require('node-schedule');
const Discord = require('discord.js');
const client = new Discord.Client();




client.on('ready', () => {
  console.log('I am ready!');
});

//PingPong
client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

//Frank
client.on('message', message => {
    if (message.content === 'Lehm oder Schaf') {
        message.reply('Gib mir Holz, du Sack!');
    }
});

//PHTEVEN
client.on('message', message => {
    if (message.content.startsWith('!phteven')) {
        const text = message.content.substr(message.content.indexOf(' ') + 1);
        funStuff.translateToPhteven(text)
            .then(result => {
                message.reply(JSON.parse(result).data);
            })
            .catch(console.error);

    }
});



//Reply to Hallo @NerdHerdBot
client.on('message', message => {
    if (message.content === ('Hallo <@' + client.user.id + '>')) {
        messageFunctions.sendMessageToChannel(client, 'Hallo <@' + message.author.id + '>!', message.channel.name);
    }
});

//Welcome Message
client.on('guildMemberAdd',(user) => {
	console.log('Greeting new member ' + user.username);
	messageFunctions.sendMessageToChannel(client, 'Willkommen auf dem NerdHerd Discord, <@' + user.id + '>! Du wirst schnellstmöglich von einem Admin für Zugriff auf alle Channels freigeschaltet.' , 'diesdas')
});

var wednesdayMessage = new schedule.RecurrenceRule();
var thursdayMessage = new schedule.RecurrenceRule();
//0 is Sunday
//Schedule for Wednesday 20:00
wednesdayMessage.dayOfWeek = 3;
wednesdayMessage.hour = 20;
wednesdayMessage.minute = 0;

thursdayMessage.dayOfWeek = 4;
thursdayMessage.hour = 18;
thursdayMessage.minute = 0;

//ask for Weekly shit
var askWednesday = schedule.scheduleJob(wednesdayMessage, function() {
    console.log('Sending Wednesday Message!');
    messageFunctions.sendMessageToChannel(client, client.guilds.find('name', 'NerdHerd').roles.find('name', '@members') + ' Wer ist am Donnerstag dabei?', 'weeklyshit');
});
var askThursday = schedule.scheduleJob(thursdayMessage, function() {
    console.log('Sending Thursday Message!');
    messageFunctions.sendMessageToChannel(client, client.guilds.find('name', 'NerdHerd').roles.find('name', '@members') + ' Wer ist ab wann da?', 'weeklyshit');
});

client.login(config.clientToken);