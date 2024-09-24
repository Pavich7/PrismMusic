import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("help").setDescription(i18n.__("help.description")),
  async execute(interaction: CommandInteraction) {
    let commands = bot.slashCommandsMap;
    console.log("ID: "+interaction.user.id+" ACTION: cmdInteract.help");
    let helpEmbed = new EmbedBuilder()
      .setTitle("PrismMusic Help Menu")
      .setColor("#0080ff")
      .addFields({
        name: 'Bugs Report',
        value: '🐞 [Report Bugs](http://pavichdev.ddns.net/Home.html#feedbackintro) to get fixed.',
      }, {
        name: 'Subscribe Premium',
        value: '✅ [Subscribe](https://www.patreon.com/pavichdev/membership) PrismMusic Premium on Patreon.',
      }, {
          name: 'Vote PrismMusic',
          value: '🗳️ [Vote](https://top.gg/bot/660117291429527554/vote/) PrismMusic on Top.gg.',
      }, {
        name: 'Request Deletion',
        value: '🗑️ [Request](https://forms.gle/8Ggr9fCwkEWxaDtV9) deletion of your data.',
      })
      .setImage("http://pavichdev.ddns.net/images/prismpre.png")
      .setFooter({ text: 'PrismMusic 24.5 (Live)'});

    return interaction.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};
