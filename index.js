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
    console.log("Version: 1.0.0");
});

client.on('presenceUpdate', async(oldMember, newMember) => {

    let oldPlaying = oldMember.activities.find(activity => activity.type === 'PLAYING') ? true : false;
    let newPlaying = newMember.activities.find(activity => activity.type === 'PLAYING') ? true : false;
    let newPlayingData = newMember.activities.find(activity => activity.type === 'PLAYING');

    const userNameRoles = newMember.guild.roles.cache.find(role => role.name === "GameStart").members.map(m => m.user.tag);
    const userName = newMember.user.username;
    const discriminator = newMember.user.discriminator;

    console.log(userNameRoles);

    console.log(
        "UserCommand:  " + userName
    );

    if (userNameRoles.indexOf(userName + "#" + discriminator) > -1) {

        if (oldPlaying == true && newPlaying == true) {
            return;
        }

        if (oldPlaying == false && newPlaying == true) {
            //Init Game
            const namegame = newPlayingData.name;

            const channel = newMember.guild.channels.cache.find(channel => channel.name === "🎮-jogando");

            if (!channel) return;

            var GameInfo_Name = [
                'Among Us',
                'Counter-Strike: Global Offensive',
                'Fall Guys: Ultimate Knockout',
                'Stardew Valley',
                'ROBLOX',
                'League of Legends',
                'Grand Theft Auto V',
                'osu!',
                'Phasmophobia'
            ]

            var GameInfo_NameCurto = [
                'Among Us',
                'CSGO',
                'Fall Guys',
                'Stardew Valley',
                'Roblox',
                'League of Legends',
                'GTA 5',
                'osu',
                'Phasmophobia'
            ]

            var GameInfo_Color = [
                '#C51111',
                '#ccba7c',
                '#277ecd',
                '#44a318',
                '#f5cd30',
                '#13181B',
                '#61B5CB',
                '#dc98a4',
                '#000000'
            ]

            var GameInfo_URL = [
                'https://store.steampowered.com/app/945360/Among_Us/',
                'https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?l=portuguese',
                'https://store.steampowered.com/app/1097150/Fall_Guys_Ultimate_Knockout/',
                'https://store.steampowered.com/app/413150/Stardew_Valley/',
                'https://www.roblox.com/home',
                'https://na.leagueoflegends.com/pt-br/',
                'https://www.rockstargames.com/V/br',
                'https://osu.ppy.sh/home',
                'https://store.steampowered.com/agecheck/app/739630/'
            ]

            var GameInfo_ImgUrl = [
                'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg?t=1610038402',
                'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1610576424',
                'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header_alt_assets_2.jpg?t=1608598304',
                'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg?t=1608624324',
                'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.rbxcdn.com%2F6c27cb9db1779888868bf7d87e6d3709.jpg&imgrefurl=https%3A%2F%2Fwww.roblox.com%2Faccount%2Fsignupredir&tbnid=UL9XxtcsVwiGXM&vet=12ahUKEwj3-q3O66HuAhXmA7kGHeZaCFwQMygAegUIARCyAQ..i&docid=YMFdg0q6w_m1AM&w=1200&h=630&q=roblox&ved=2ahUKEwj3-q3O66HuAhXmA7kGHeZaCFwQMygAegUIARCyAQ',
                'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/pt_BR/c90bd494d0d5a9eecb710c7895776bb332a0e51a/assets/pt_BR/assets/lol-logo.png',
                'https://ogimg.infoglobo.com.br/in/9951935-a99-3f4/FT1086A/652/xGTA-V-big.jpg.pagespeed.ic.tUMoxHtGRM.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/d/d3/Osu%21Logo_%282015%29.png',
                'https://www.speedrun.com/themes/phasmophobia/cover-256.png'
            ]

            var gamePosition = GameInfo_Name.indexOf(namegame);
            var gamecolor = GameInfo_Color[gamePosition];
            var gameURL = GameInfo_URL[gamePosition];
            var gameImgURL = GameInfo_ImgUrl[gamePosition];
            var gameNameCurto = GameInfo_NameCurto[gamePosition];

            if (gameNameCurto == undefined) {
                gameNameCurto = namegame;
            }

            console.log(
                "UserGame:  " + namegame
            );

            const welcomeEmbed = new Discord.MessageEmbed()
                .setColor(gamecolor)
                .setTitle(userName)
                .setURL(gameURL)
                .setDescription("")
                .addField(`:wave: Estou jogando ${gameNameCurto}!`, `Olá amigo, você está convidado para jogar comigo!`, false)
                .setThumbnail(gameImgURL)
                .setFooter('Só jogamos para ganhar... 😂')
                .setTimestamp();
            channel.send(welcomeEmbed);
        }

        if (oldPlaying == true && newPlaying == false) {
            //GameEncerrado
            const messagecount = 100;
            const canalMessage = newMember.guild.channels.cache.find(channel => channel.name === "🎮-jogando");
            canalMessage.messages.fetch({
                limit: messagecount
            }).then((mgs) => {
                var msgToRemove = mgs.filter(m => m.embeds.title = userName).array().slice(0, messagecount);
                console.log(msgToRemove);
                canalMessage.bulkDelete(msgToRemove);
            });
        }
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
        console.log("Ocorreu um erro inesperado! [Game-Start]")
    }
});

client.login(process.env.TOKEN);