const Discord = require("discord.js")
const bot = new Discord.Client({
    intents: 3276799
})
const funner = new Discord.Client({
    intents: 3276799
})
const loadCommands = require("./loader/loadCommands")
const loadEvents = require("./loader/loadEvents")
const loadFun = require("./loader/loadFun")
const config = require("./config")

const arr_quoi = new RegExp("([Qq]+[Uu]*|[Kk]+[Uu]*)([Uu]+|[Ww]+|[Oo]+)([Oo]+[Ii]+|[Aa]+)[Hh]*[?.!,\s]*$");
const arr_oui = new RegExp("[Oo]+[Uu]+[Ii]+[?.!,\\s]*$");
const arr_bloop = new RegExp("[Bb]+[Ll]+[Oo]+[Oo]+[Pp]+[?.!,\\s]*$");

bot.commands = new Discord.Collection()
funner.commands = new Discord.Collection()
bot.color = "#ffffff";

bot.login(config.token)
funner.login(config.token)

loadCommands(bot)
loadEvents(bot)
loadFun(funner)

funner.on("messageCreate", async message => {
    if (arr_quoi.test(message)) {
        return funner.commands.get("feur").run(funner, message)
    }
    if (arr_oui.test(message)) {
        return funner.commands.get("stiti").run(funner, message)
    }
    if (arr_bloop.test(message)) {
        return funner.commands.get("lord").run(funner,message)
    }
    if (message.content === "chief, sais-tu parler chinois ?") {
        return funner.commands.get("ching").run(funner, message)
      }
})

bot.on("ready", async () => {
    console.log(`${bot.user.tag} est en ligne`)
})
