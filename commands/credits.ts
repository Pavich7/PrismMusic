import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("credits").setDescription(i18n.__("credits.description")),
  async execute(interaction: CommandInteraction) {
    console.log("ID: "+interaction.user.id+" ACTION: cmdInteract.credits");
    let commands = bot.slashCommandsMap;
    let helpEmbed = new EmbedBuilder()
      .setTitle("Special Thanks for these guys")
      .setColor("#0080ff")
      .addFields({
        name: '💻 Programmer',
        value: 'PavichIsΔDev @pavichisadev'
      }, {
        name: '⌨️ Tester',
        value: 'iceice188 @iceice188',
      }, {
        name: '🖼️ Logo Designer',
        value: 'eel @eelectromagnetic_radiation',
      })
      .setFooter({ text: 'MadeByPavich © 2019-2024 Pavich Komansil.'});
    return interaction.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};
