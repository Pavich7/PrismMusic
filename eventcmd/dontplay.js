const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "dontplay",
  description: i18n.__("secret.description"),
  execute(message) {
    let inviteEmbed = new MessageEmbed()
      .setTitle("DONT PLAY THESE MUSIC")
      .setColor("#0080ff")
      .addFields({
        name: 'Music 1',
        value: 'https://youtu.be/DLzxrzFCyOs'
      }, {
        name: 'Music 2',
        value: 'https://youtu.be/dQw4w9WgXcQ',
      })
      .setFooter("Only working on Desktop or Web version")
    return message.channel.send(inviteEmbed).catch(console.error);
  }
};
