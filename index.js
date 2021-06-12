let Discord = require('discord.js');
let wiki = require('wikijs').default
let config = require('./config.json')


let prefixes = [
    { prefix: '/кто' }
];

const PREFIX = '!кто'

const EMPTY_MESSAGE_BODY_ERROR = 'Отстутствует тело запроса'

// const prefixes = [
//     '/whois',
//     '/кто',
//     '/каво',
//     '/whoam',
//     '/wtfis',
//     '/wtf'
// ]

// function isTextStartsWithPrefix(text) {
//     prefixes.forEach
// }


let wikiRU = 'https://ru.wikipedia.org/w/api.php';


let client = new Discord.Client();
client.login(config.BOT_TOKEN);

client.on('ready', () => {
    client.user.setActivity("!кто, !кто <имя>", {
        type: "PLAYING"
      });
})



client.on('message', message => {
    if(message.author.bot) return;
    if(!message.content) return;
    if(message.content.trim() == '') return;
    if(!message.content.startsWith(PREFIX)) return;

    let body = message.content.replace(PREFIX, '').trim();
    if(body == '' || body == 'я') 
        body = 'Ты';

    let result = body;

    wiki({ apiUrl: wikiRU }).random()
        .then(title => wiki({ apiUrl: wikiRU }).page(title))
        .then(page => {
            // console.log(page);
            let title = page.title;
            page.summary().then(info => {
                result += (' — «' + title + '»: ' + '||' + info + '||');
                // console.log(info);
                message.reply(new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(body + ' — ' + title)
                    .setDescription(`||${info}||`))
                    .setColor('#FF0000');
            });
        });
});



