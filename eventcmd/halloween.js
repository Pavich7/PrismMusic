const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "halloween",
  aliases: ["event"],
  description: i18n.__("halloween.description"),
  execute(message) {
    let helpEmbed = new MessageEmbed()
      .setTitle("Special Music for Halloween Event")
      .setDescription('+play (Special URL or Special Music Name)')
      .setColor("#23006e")
      .addFields({
        name: 'Billie Eilish - bury a friend',
        value: 'https://www.youtube.com/watch?v=HUHC9tYz8ik'
      }, {
        name: 'Ava Max - Sweet but Psycho',
        value: 'https://www.youtube.com/watch?v=WXBHCQYxwr0',
      }, {
        name: 'Beyoncé - Haunted',
        value: 'https://www.youtube.com/watch?v=K4r4lysSgLE',
      })
      .setFooter("Event end on October 31, 2021")
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
