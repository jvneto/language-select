const express = require('express')
const app = express()

app.get('/', function(req, res) {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(`Ping recebido ás ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
	res.sendStatus(200);
})

app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Bot Online!`);
});


client.on('message', message => {

	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/g);
	const command = args.shift().toLowerCase();
	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(message, args, Discord, client);
	} catch (err) {
		console.log("Ocorreu um erro inesperado! [Game-Start]")
	}
});

client.login(process.env.TOKEN);
