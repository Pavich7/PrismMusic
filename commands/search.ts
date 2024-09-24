import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  StringSelectMenuInteraction
} from "discord.js";
import youtube, { Video } from "youtube-sr";
import { bot } from "..";
import { i18n } from "../utils/i18n";

export default {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription(i18n.__("search.description"))
    .addStringOption((option) =>
      option.setName("query").setDescription(i18n.__("search.optionQuery")).setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
      const guildId = '754180668283551856'; // Replace with the ID of the other server
      const guild = bot.client.guilds.cache.get(guildId);
      const userId = interaction.user.id; // Replace with the ID of the user you want to check
      const memberManager = guild?.members;
      const findmember = await memberManager?.fetch(userId);
      const roleId = '1106528688037707866'; // Replace with the ID of the role you want to check
      const hasRole = findmember?.roles.cache.has(roleId);
      if (hasRole === true) {
          const query = interaction.options.getString("query", true);
          const member = interaction.guild!.members.cache.get(interaction.user.id);
          console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.search CONTENT: " + query);
          if (!member?.voice.channel)
              return interaction.reply({ content: i18n.__("search.errorNotChannel"), ephemeral: true }).catch(console.error);

          const search = query;

          await interaction.reply("⏳ Loading...").catch(console.error);

          let results: Video[] = [];

          try {
              results = await youtube.search(search, { limit: 10, type: "video" });
            } catch (error) {
              console.error(error);
              interaction.editReply({ content: i18n.__("common.errorCommand") }).catch(console.error);
              return;
          }

          if (!results || !results[0]) {
            interaction.editReply({ content: i18n.__("search.noResults") });
            return;
          }
          const options = results!.map((video) => {
              return {
                  label: video.title ?? "",
                  value: video.url
              };
          });

          const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
              new StringSelectMenuBuilder()
                  .setCustomId("search-select")
                  .setPlaceholder("Nothing selected")
                  .setMinValues(1)
                  .setMaxValues(10)
                  .addOptions(options)
          );

          const followUp = await interaction.followUp({
              content: "⬇️ Choose to play",
              components: [row]
          });

          followUp
              .awaitMessageComponent({
                  time: 30000
              })
              .then((selectInteraction) => {
                  if (!(selectInteraction instanceof StringSelectMenuInteraction)) return;

                  selectInteraction.update({ content: "⏳ Loading...", components: [] });

                  bot.slashCommandsMap
                      .get("play")!
                      .execute(interaction, selectInteraction.values[0])
                      .then(() => {
                          selectInteraction.values.slice(1).forEach((url) => {
                              bot.slashCommandsMap.get("play")!.execute(interaction, url);
                          });
                      });
              })
              .catch(console.error);
      } else {
          const query = interaction.options.getString("query", true);
          const member = interaction.guild!.members.cache.get(interaction.user.id);
          console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.search CONTENT: " + query + " FORBIDDEN: reqUser.PremSub");
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
