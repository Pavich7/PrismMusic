import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bot } from "../index";
import { i18n } from "../utils/i18n";
import { canModifyQueue } from "../utils/queue";
import { safeReply } from "../utils/safeReply";

export default {
  data: new SlashCommandBuilder().setName("shuffle").setDescription(i18n.__("shuffle.description")),
  execute(interaction: ChatInputCommandInteraction) {
    const queue = bot.queues.get(interaction.guild!.id);
    const guildMemer = interaction.guild!.members.cache.get(interaction.user.id);
    console.log("ID: "+interaction.user.id+" ACTION: cmdInteract.shuffle");
    if (!queue)
      return interaction.reply({ content: i18n.__("shuffle.errorNotQueue"), ephemeral: true }).catch(console.error);

    if (!guildMemer || !canModifyQueue(guildMemer)) return i18n.__("common.errorNotChannel");

    let songs = queue.songs;

    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    queue.songs = songs;

    const content = i18n.__mf("shuffle.result", { author: interaction.user.id });

    safeReply(interaction, content);
  }
};