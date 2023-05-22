const fs = require("fs")

module.exports = async funner => {
    fs.readdirSync("./fun").filter(f => f.endsWith(".js")).forEach(async file => {
        let command = require(`../fun/${file}`)
        if (!command.name || typeof command.name !== "string") {
            throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom`)
        }
            funner.commands.set(command.name, command)
            console.log(`Commande ${file} chargée avec succès`)
    })
}
