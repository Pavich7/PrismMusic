import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("whatsnew").setDescription(i18n.__("whatsnew.description")),
  async execute(interaction: CommandInteraction) {
    let commands = bot.slashCommandsMap;
    console.log("ID: "+interaction.user.id+" ACTION: cmdInteract.whatsnew");
    let helpEmbed = new EmbedBuilder()
    .setTitle("What's new in PrismMusic 24.5")
    .setColor("#0080ff")
    .addFields({
      name: 'Join our Discord Server',
      value: '[Join PavichDev Community](https://discord.gg/pneR4gu3VD) to get the latest news.',
    })
    return interaction.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};
