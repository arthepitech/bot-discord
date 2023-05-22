const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "unmute",
    description: "Unmute la personne choisie",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre à unmute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unmute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre")
        if (!user) {
            return message.reply("Pas de membre.")
        }
        let member = message.guild.members.cache.get(user.id)
        if (!member) {
            return message.reply("Pas de membre.")
        }
        let reason = args.getString("raison")
        if (!reason) {
            reason = "Pas de raison fournie."
        }
        if (!member.moderatable) {
            return message.reply("Je ne peux pas unmute ce membre.")
        }
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply("Tu ne peux pas unmute des gens au même échelon que toi.")
        }
        if (!member.isCommunicationDisabled()) {
            return message.reply("Ce membre est déjà unmute.")
        }
        try {
            await user.send(`Tu as été unmute sur le server ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)
        } catch(err) {}
        await message.reply(`${message.user} a unmute ${user.tag} pour la raison: \`${reason}\``)
        await member.timeout(null, reason)
    }
}
