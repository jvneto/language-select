const express = require('express')
const app = express()

app.get('/', function(req, res) {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido ás ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    res.sendStatus(200);
    console.log("Version: 1.0.2");
})

app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('raw', event => {

// 	// console.log(event);

// 	if (event.t !== "MESSAGE_REACTION_ADD" && event.t !== "MESSAGE_REACTION_REMOVE") {
// 		return;
// 	}

// 	if(event.d.message_id != process.env.MESSAGEID){
// 		console.log("passei")
// 		return;
// 	}

// 	var serveEvent = client.guilds.cache.get(process.env.SERVERID); 
// 	const { d: data } = event;
//  	const user = serveEvent.members.cache.get(data.user_id)

// 	// 
// 	// var english = serveEvent.roles.cache.get(process.env.ENGLISH);

// 	// if(event.t === "MESSAGE_REACTION_ADD"){
// 	// 	if(event.d.emoji.name === "🇧🇷"){
// 	// 		console.log("Encontrado!!")
// 	// 		if(user.roles.cache.has(ptbr)){
// 	// 			return;
// 	// 			console.log("Encontrado!")
// 	// 		}else{
// 	// 			console.log("Não encontrado!")
// 	// 		}

// 	// 	}else if(event.d.emoji.name === "🇺🇸"){
// 	// 		// if(user.roles.has(ptbr)){
// 	// 		// 	return;
// 	// 		// }
// 	// 		// user.addRole(english);
// 	// 		console.log("Encontrado2!!")
// 	// 	}	
// 	// }

// 	// if(event.t === "MESSAGE_REACTION_REMOVE"){
// 	// 	if(event.d.emoji.name === "🇧🇷"){
// 	// 		if(user.roles.has(ptbr)){
// 	// 			return;
// 	// 		}
// 	// 		user.removeRole(ptbr);
// 	// 	}else if(event.d.emoji.name === "🇺🇸"){
// 	// 		if(user.roles.has(ptbr)){
// 	// 			return;
// 	// 		}
// 	// 		user.removeRole(english);
// 	// 	}	
// 	// }
// });

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    if (event.t !== "MESSAGE_REACTION_ADD" && event.t !== "MESSAGE_REACTION_REMOVE") {
        return;
    }

    if (event.d.message_id == process.env.MESSAGEID) {
        console.log("Messagem encontrada!")
        const { d: data } = event;
        const user = client.users.cache.get(data.user_id)
        const channel = client.channels.cache.get(data.channel_id) || await user.createDM();
        if (channel.messages.cache.has(data.message_id)) return;
        const message = await channel.messages.fetch(data.message_id);
        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.cache.get(emojiKey);
        client.emit(events[event.t], reaction, user);
    } else {
        console.log("Mensagen não encontrada!")
    }
});


client.on('messageReactionAdd', (reaction, user) => {
    if (reaction !== "" && user !== "") {
        var roleName = reaction.emoji.name;
        var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());

        if (role) {
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            console.log(member);
        }


    }
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction !== "" && user !== "") {
        console.log(user.username)
        console.log(reaction.emoji.name)
    }
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