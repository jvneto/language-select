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
});

client.on('message', msg => {

	if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, msg, args);
	} catch (err) {
		console.log("Ocorreu um erro inesperado!")
	}
});

client.login(process.env.TOKEN);
