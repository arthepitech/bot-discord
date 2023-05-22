const Discord = require("discord.js")

module.exports = {
    name: "lord",
    description: "répond bloop à bloop",
    // category: "Fun",
    async run(funner, message) {
        await message.reply(`bloop :sunglasses:`),
        await message.reply(`https://tenor.com/view/dancing-dance-moves-grooves-lizard-gif-17757353`)
    }
}
