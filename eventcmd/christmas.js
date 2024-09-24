const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "christmas",
  aliases: ["event"],
  description: i18n.__("christmas.description"),
  execute(message) {
    let helpEmbed = new MessageEmbed()
      .setTitle("Party Music for Christmas Event")
      .setDescription('+play (Special URL or Special Music Name)')
      .setColor("#188045")
      .addFields({
        name: 'Mariah Carey - All I Want For Christmas Is You',
        value: 'https://youtu.be/yXQViqx6GMY'
      }, {
        name: 'East 17 - Stay Another Day',
        value: 'https://youtu.be/-wNhdjoF-6M',
      }, {      
	name: 'Ariana Grande - Santa Tell Me',
        value: 'https://youtu.be/nlR0MkrRklg',
      })
      .setFooter("Event end on December 27")
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
