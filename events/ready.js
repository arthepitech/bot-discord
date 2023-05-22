const Discord = require("discord.js")
const loadSlash = require("../loader/loadSlash")
// const loadDatabase = require("../loader/loadDatabase")

module.exports = async bot => {
    // bot.db = await loadDatabase()
    // bot.db.connect(function () {
    //     console.log("Base de données connectée")
    // })
    await loadSlash(bot)
    console.log(`${bot.user.tag} est bien en ligne`)
}
