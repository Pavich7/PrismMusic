import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, Client } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("premium").setDescription(i18n.__("premium.description")),
    async execute(interaction: CommandInteraction) {
    const guildId = '754180668283551856'; // Replace with the ID of the other server
    bot.client.guilds.fetch(guildId);
    const guild = bot.client.guilds.cache.get(guildId);
    const userId = interaction.user.id;
    const memberManager = guild?.members;
    const member = await memberManager?.fetch(userId);
    const roleId = '1106528688037707866';
    const hasRole = member?.roles.cache.has(roleId);
    console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.premium CONTENT: user.hasPremium " + hasRole);
    if (hasRole === true) {
        let yesEmbed = new EmbedBuilder()
            .setTitle("PrismMusic Premium")
            .setColor("#00ff23")
            .addFields({
                name: "✅ Premium Status",
                value: "Status: ACTIVATED",
            }, {
                name: 'Manage Subscription',
                value: '⚙️ [Manage Premium](https://www.patreon.com/pavichdev/membership) on Patreon.',
            }, {
                name: 'Visit Premium Community',
                value: '👀 [Visit Premium Community](https://discord.com/channels/754180668283551856/1106528981634785380) on PavichDev.',
            }, {
                name: 'Get Quick Support',
                value: '🆘 [Go to Quick Support Center](https://discord.com/channels/754180668283551856/1107137379610923078) for Premium Help.',
            })
        return interaction.reply({ embeds: [yesEmbed] }).catch(console.error);
    } else {
        let noEmbed = new EmbedBuilder()
            .setTitle("PrismMusic Premium")
            .setColor("#ff0000")
            .addFields({
                name: "❌ Premium Status",
                value: "Status: NON-PREMIUM",
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
