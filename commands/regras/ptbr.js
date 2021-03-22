module.exports.run = async (message, args, Discord, client) => {
	var channel = process.env.CHANNELSTART;

	var regrasList = [
		"```Markdown\n# Regra 1:\nRespeite outros membros.\n\n# Regra 2:\nNão poste coisas para maiores de 18 anos.\n\n# Regra 3:\nNão envie muitas mensagens consecutivas (flood).\n\n# Regra 4:\nNão use palavras de baixo calão.\n\n# Regra 5:\nRespeite a estrutura de canais e mande mensagens sobre um determinado assunto apenas em seu respectivo canal.\n\n# Regra 6:\nMensagens que atentam ou incentivam o mal uso do sistema serão excluídas e seu conteúdo levado para verificação e correção.\n\n# Regra 7:\nNão nos responsabilizamos por acontecimentos fora do servidor, já que não há como termos controle do que acontece.\n\n# Obs.:\nRegras podem mudar e é responsabilidade sua se manter sempre informado.\n\n> Desrespeitar as regras poderá te levar a um kick ou um possível ban```",
		""+ message.guild.channels.cache.get('823516596907671552').toString()+"\n⤷ Você está aqui agora, canal onde mostra as regras, canais e permissões do servidor.\n\n"+ message.guild.channels.cache.get('823522127310487592').toString()+"\n⤷ Canal onde colocaremos avisos para novas e futuras atualizações.",
		"[https://discord.gg/79Qq3F6](https://discord.gg/79Qq3F6)",
		"@everyone\n⤷ Permissão básica, qualquer pessoa nova no grupo terá esse \"papel\".\n\n"
	];

	if (message.member.hasPermission("ADMINISTRATOR")) {
		let token = parseInt(args[0]);

		if (token != "" && token == process.env.TOKENPERMISSION) {

			// message.channel.messages.fetch({ limit: 10 }).then(messages => message.channel.bulkDelete(messages, true));

			let embed = new Discord.MessageEmbed()
				.setColor('#ffcc00')
				.setTitle('📜 Regras do Servidor')
				// .setAuthor('Zul', 'https://weduc.natalnet.br/sbotics/funcoes/blockEduc/img/favicon.png')
				.setDescription("```Bem-Vindo a Comunidade Oficial no Discord do sBotics!```")
				.setThumbnail('https://i.ibb.co/51YJwhq/regras.png')
				.setFooter('sBotics - Regras do Servidor', 'https://weduc.natalnet.br/sbotics/funcoes/blockEduc/img/feliz.png')
				.addField(`<:zul:823515628694405150> Regras:`, regrasList[0], false)
				.addField(`<:zul:823515628694405150> Canais:`, regrasList[1], false)
				.addField(`<:zul:823515628694405150> Link oficial para convidar pessoas para o grupo:`, regrasList[2], false)
				.addField(`<:zul:823515628694405150> Permissões (os em amarelo são os que você faz parte):`, regrasList[3], false)
			await message.channel.send(embed);
		} else {
			return message.reply(":x: " + "| Access Denied!")
		}
	} else {
		return message.reply(":x: " + "| Acesso Negado!")
	}
};
