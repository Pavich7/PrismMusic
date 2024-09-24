import { DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
  TextChannel
} from "discord.js";
import { bot } from "../index";
import { MusicQueue } from "../structs/MusicQueue";
import { Playlist } from "../structs/Playlist";
import { Song } from "../structs/Song";
import { i18n } from "../utils/i18n";

export default {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription(i18n.__("playlist.description"))
    .addStringOption((option) => option.setName("playlist").setDescription("Playlist name or link").setRequired(true)),
  cooldown: 5,
  permissions: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak],
  async execute(interaction: ChatInputCommandInteraction, queryOptionName = "playlist") {
      const guildId = '754180668283551856'; // Replace with the ID of the other server
      const guild = bot.client.guilds.cache.get(guildId);
      const userId = interaction.user.id; // Replace with the ID of the user you want to check
      const memberManager = guild?.members;
      const member = await memberManager?.fetch(userId);
      const roleId = '1106528688037707866'; // Replace with the ID of the role you want to check
      const hasRole = member?.roles.cache.has(roleId);
      if (hasRole === true) {
        let argSongName = interaction.options.getString(queryOptionName);
          console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.playlist CONTENT: " + argSongName);
          const guildMemer = interaction.guild!.members.cache.get(interaction.user.id);
          const { channel } = guildMemer!.voice;

          const queue = bot.queues.get(interaction.guild!.id);

          if (!channel)
              return interaction.reply({ content: i18n.__("playlist.errorNotChannel"), ephemeral: true }).catch(console.error);

          if (queue && channel.id !== queue.connection.joinConfig.channelId)
              if (interaction.replied)
                  return interaction
                      .editReply({ content: i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user!.username }) })
                      .catch(console.error);
              else
                  return interaction
                      .reply({
                          content: i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user!.username }),
                          ephemeral: true
                      })
                      .catch(console.error);

          let playlist;

          try {
              playlist = await Playlist.from(argSongName!.split(" ")[0], argSongName!);
          } catch (error) {
              console.error(error);

              if (interaction.replied)
                  return interaction.editReply({ content: i18n.__("playlist.errorNotFoundPlaylist") }).catch(console.error);
              else
                  return interaction
                      .reply({ content: i18n.__("playlist.errorNotFoundPlaylist"), ephemeral: true })
                      .catch(console.error);
          }

          if (queue) {
              queue.songs.push(...playlist.videos);
          } else {
              const newQueue = new MusicQueue({
                  interaction,
                  textChannel: interaction.channel! as TextChannel,
                  connection: joinVoiceChannel({
                      channelId: channel.id,
                      guildId: channel.guild.id,
                      adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
                  })
              });

              bot.queues.set(interaction.guild!.id, newQueue);
              newQueue.songs.push(...playlist.videos);

              newQueue.enqueue(playlist.videos[0]);
          }

          let playlistEmbed = new EmbedBuilder()
              .setTitle(`${playlist.data.title}`)
              .setDescription(playlist.videos.map((song: Song, index: number) => `${index + 1}. ${song.title}`).join("\n"))
              .setURL(playlist.data.url!)
              .setColor("#0080ff")
              .setTimestamp();

          if (playlistEmbed.data.description!.length >= 2048)
              playlistEmbed.setDescription(
                  playlistEmbed.data.description!.substr(0, 2007) + i18n.__("playlist.playlistCharLimit")
              );

          if (interaction.replied)
              return interaction.editReply({
                  content: i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
                  embeds: [playlistEmbed]
              });
          interaction
              .reply({
                  content: i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
                  embeds: [playlistEmbed]
              })
              .catch(console.error);
      } else {
          let argSongName = interaction.options.getString("playlist");
          console.log("ID: " + interaction.user.id + " ACTION: cmdInteract.playlist CONTENT: " + argSongName+ " FORBIDDEN: reqUser.PremSub");
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
