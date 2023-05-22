const Discord = require("discord.js")

module.exports = {
    name: "unban",
    description: "Unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "l'utilisateur' à déban",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du déban",
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {
        try {
            let user = args.getUser("utilisateur")
            if (!user) {
                return message.reply("Pas d'utilisateur.")
            }
            let reason = args.getString("raison")
            if (!reason) {
                reason = "Pas de raison fournie."
            }
            if (!(await message.guild.bans.fetch()).get(user.id)) {
                return message.reply("Cet utilisateur n'est pas ban.")
            }
            try {
                await user.send(`Tu as été déban du server ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)
            } catch(err) {}
            await message.reply(`${message.user} a déban ${user.tag} pour la raison: \`${reason}\``)
            await message.guild.members.unban(user, reason)
        } catch(err) {
            return message.reply("Pas d'utilisateurs.")
        }
    }
}
