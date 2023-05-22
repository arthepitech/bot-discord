const Discord = require("discord.js")

const messcontent = new Array(
"https://tenor.com/view/feur-theobabac-quoi-gif-24294658",
"https://tenor.com/view/feur-meme-gif-24407942",
"https://tenor.com/view/feur-th%C3%A9obabac-not-funny-gif-22130648",
"https://tenor.com/view/quoi-feur-quoi-feur-coiffeur-freaky-versus-gif-25841907",
"https://tenor.com/view/multicort-feur-gif-23304150",
"https://tenor.com/view/feur-quoi-gif-25202359");

let sameString = "";

module.exports = {
    name: "feur",
    description: "répond feur à quoi",
    // category: "Fun",
    async run(funner, message) {
        let randomString = "";
        do {
            const randomIndex = Math.floor(Math.random() * messcontent.length);
            randomString = messcontent[randomIndex];
        } while (randomString === sameString);
        sameString = randomString;
        await message.reply(`${randomString}`);
    }
}
