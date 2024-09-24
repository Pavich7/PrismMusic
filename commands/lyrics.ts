import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
// @ts-ignore
import lyricsFinder from "lyrics-finder";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("lyrics").setDescription(i18n.__("lyrics.description")),
    async execute(interaction: ChatInputCommandInteraction) {
    const guildId = '754180668283551856'; // Replace with the ID of the other server
    const guild = bot.client.guilds.cache.get(guildId);
    const userId = interaction.user.id; // Replace with the ID of the user you want to check
    const memberManager = guild?.members;
    const member = await memberManager?.fetch(userId);
    const roleId = '1106528688037707866'; // Replace with the ID of the role you want to check
    const hasRole = member?.roles.cache.has(roleId);
    if (hasRole === true) {
        const queue = bot.queues.get(interaction.guild!.id);
        console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.lyrics");
        if (!queue || !queue.songs.length) return interaction.reply(i18n.__("lyrics.errorNotQueue")).catch(console.error);

        await interaction.reply("⏳ Loading...").catch(console.error);

        let lyrics = null;
        const title = queue.songs[0].title;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
        } catch (error) {
            lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
        }

        let lyricsEmbed = new EmbedBuilder()
            .setTitle(i18n.__mf("lyrics.embedTitle", { title: title }))
            .setDescription(lyrics.length >= 4096 ? `${lyrics.substr(0, 4093)}...` : lyrics)
            .setColor("#0080ff")

        return interaction.editReply({ content: "", embeds: [lyricsEmbed] }).catch(console.error);
    } else {
        console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.lyrics FORBIDDEN: reqUser.PremSub");
        let noEmbed = new EmbedBuilder()
            .setTitle("PrismMusic Premium Required")
            .setColor("#ff0000")
            .addFields({
                name: "This feature is only for Premium",
                value: "Subscribe Premium to access this feature.",
            }, {
                name: 'Subscribe Premium',
                value: '✅ [Subscribe Premium](https://www.patreon.com/pavichdev/membership) on Patreon.',
            }, {
                name: 'Get Quick Support',
                value: '🆘 [Go to Quick Support Center](https://discord.com/channels/754180668283551856/1107137379610923078) for Premium Help.',
            })
        return interaction.reply({ embeds: [noEmbed] }).catch(console.error);
    }
  }
};
