module.exports.run = async (message, args, Discord, client) => {
  if(message.member.hasPermission("ADMINISTRATOR")) { 
    let messagecount = parseInt(args[0]);
    
    if(isNaN(messagecount)){
      return message.channel.send(":x: " + "| Mencione a quantidade de mensagem que deseja excluir");
    }
    console.log(messagecount)
    if(messagecount > 2 && messagecount < 101 ){
      message.channel.messages.fetch({limit: messagecount}).then(messages => message.channel.bulkDelete(messages, true));
    }else{
      return message.channel.send(":x: " + "| Erro, você só pode excluir entre 2 e 100 mensagens por vez !")
    }
  } else {
    return message.reply(":x: " + "| Você precisa ser ADMINISTRADOR para fazer isso!")
  }
};  
