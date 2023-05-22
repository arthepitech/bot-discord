const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre à ban",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du ban",
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {
        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if (!user) {
                return message.reply("Pas de membre à bannir.")
            }
            let member = message.guild.members.cache.get(user.id)
            let reason = args.get("raison").value;
            if (!reason) {
                reason = "Pas de raison fournie."
            }
            if (message.user.id === user.id) {
                return message.reply("Essaie pas de te ban !")
            }
            if ((await message.guild.fetchOwner()).id === user.id) {
                return message.reply("Pas de ban du proprio.")
            }
            if (member && !member.bannable) {
                return message.reply("Je ne peux pas bannir ce membre.")
            }
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.reply("Tu ne peux pas ban des gens au même échelon que toi.")
            }
            if ((await message.guild.bans.fetch()).get(user.id)) {
                return message.reply("Cette personne a déjà été ban.")
            }

            try {
                await user.send(`Tu as été banni du server ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)
            } catch(err) {}
            await message.reply(`${message.user} a banni ${user.tag} pour la raison: \`${reason}\``)
            await message.guild.bans.create(user.id, {reason: reason})
        } catch (err) {
            return message.reply("Pas de membre à bannir.")
        }
    }
}