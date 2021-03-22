module.exports.run = async (message, args, Discord, client) => {
	var channel = process.env.CHANNELSTART;

	var languageEmoji = [
		'🇧🇷',
		'🇺🇸'
	];
	var language = [
		'PT-BR',
		'English'
	];
	var languageText = [
		'Selecione seus idiomas de preferencias para melhor experiência de uso!',
		'Select your preferred languages ​​for the best user experience!'
	];
	var languageRole = [
		process.env.PTBR,
		process.env.ENGLISH
	];
	if (message.member.hasPermission("ADMINISTRATOR")) {
		let token = parseInt(args[0]);

		if (token != "" && token == process.env.TOKENPERMISSION && message.channel.id == process.env.CHANNELSTART) {

			message.channel.messages.fetch({ limit: 10 }).then(messages => message.channel.bulkDelete(messages, true));

			let embed = new Discord.MessageEmbed()
				.setColor('#2fa9c2')
				// .setTitle('Zul')
				.setAuthor('Zul', 'https://weduc.natalnet.br/sbotics/funcoes/blockEduc/img/favicon.png')
				.setDescription('')
				.setThumbnail('https://weduc.natalnet.br/sbotics/funcoes/blockEduc/img/feliz.png')
				.setFooter('', 'https://weduc.natalnet.br/sbotics/funcoes/blockEduc/img/feliz.png')
				.addField(`${languageEmoji[0]} ${language[0]}!`, `${languageText[0]}`, false)
				.addField(`${languageEmoji[1]} ${language[1]}!`, `${languageText[1]}`, false)

			let messageEmbed = await message.channel.send(embed);
			messageEmbed.react(languageEmoji[0]);
			messageEmbed.react(languageEmoji[1]);
		} else {
			return message.reply(":x: " + "| Access Denied!")
		}
	} else {
		return message.reply(":x: " + "| Acesso Negado!")
	}



	client.on('messageReactionAdd', async (reaction, user) => {
		console.log("Init")
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;

		if (reaction.message.channel.id == channel) {

			var langComplete = languageEmoji.indexOf(reaction.emoji.name);
			if (langComplete > -1) {
				const getRole = message.guild.roles.cache.find(role => role.id === languageRole[langComplete]);
				await reaction.message.guild.members.cache.get(user.id).roles.add(getRole);
			}
		} else {
			return;
		}
	});

	client.on('messageReactionRemove', async (reaction, user) => {
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;

		if (reaction.message.channel.id == channel) {
			var langComplete = languageEmoji.indexOf(reaction.emoji.name);
			if (langComplete > -1) {
				const getRole = message.guild.roles.cache.find(role => role.id === languageRole[langComplete]);
				await reaction.message.guild.members.cache.get(user.id).roles.remove(getRole);
			}
		} else {
			return;
		}
	});
};
