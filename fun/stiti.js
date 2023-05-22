const Discord = require("discord.js")

module.exports = {
    name: "stiti",
    description: "répond stiti à oui",
    // category: "Fun",
    async run(funner, message) {
        await message.reply(`Stiti !`)
    }
}