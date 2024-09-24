const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "special",
  aliases: ["event"],
  description: i18n.__("spacial.description"),
  execute(message) {
    let helpEmbed = new MessageEmbed()
      .setTitle("Most testing music play by our developer")
      .setDescription('+play (Special URL or Special Music Name)')
      .setColor("#00a1c9")
      .addFields({
        name: 'Britt Nicole - All This Time',
        value: 'https://www.youtube.com/watch?v=HmTGLdSW5Sw'
      }, {
        name: 'Miles Away - Bring Me Back',
        value: 'https://www.youtube.com/watch?v=iWy4W5JLcNo',
      }, {
        name: 'Cash Cash - Hero',
        value: 'https://www.youtube.com/watch?v=iafxqkKZacA',
      }, {
        name: 'Gryffin, Illenium - Feel Good',
        value: 'https://www.youtube.com/watch?v=gBkWR-WfEeU',
      })
      .setFooter("Event end on November 20, 2021")
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
