const { Discord, MessageEmbed, Collection, Map, Client} = require('discord.js');
const client = new Client();
const {prefix, token, link} = require('./configs/settings.json');
const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const g9 = require("g9db");
const db = new g9.Database(link, "Database");
const AsciiTable = require('ascii-table');
const { Player } = require("discord-player");
const player = new Player(client);

client.player = player;
client.config = require('./configs/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;

const players = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandertab =  new AsciiTable('Event Table')

commandertab.setHeading('Command Type','Event Name','Events Type')

for (const file of players) {
commandertab.addRow('Player',file,file.split('.')[0])
const event = require(`./player/${file}`);
client.player.on(file.split(".")[0], event.bind(null, client));};

for (const file of events) {
commandertab.addRow('Events',file,file.split('.')[0])
const event = require(`./events/${file}`);
client.on(file.split(".")[0], event.bind(null, client));};

console.log('\x1b[31m%s\x1b[0m', commandertab.toString())

var commandtable = new AsciiTable('Simqle Command Table');



client.commands = new Collection();
client.aliases = new Collection();


commandtable.setHeading("Command", 'Available', "Aliases")
fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
const commandolar = require(`./commands/${dir}/${file}`);
if (commandolar.help.name) {
client.commands.set(commandolar.help.name, commandolar);
commandtable.addRow(commandolar.help.name, "TRUE", commandolar.conf.aliases)
} else {
commandtable.addRow(commandolar.help.name, "FALSE")
continue;}
commandolar.conf.aliases.forEach(alias => {
client.aliases.set(alias, commandolar.help.name);
});}})
console.log(chalk.cyan(commandtable.toString()))
client.elevation = message => {
if(!message.guild) {
return; }
let permlvl = 0;
if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
if (message.author.id === 807989751134552074) permlvl = 5;
return permlvl;};
client.login(token)




