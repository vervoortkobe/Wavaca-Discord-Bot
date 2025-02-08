const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
  const youtubeEmbed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(`▶️ | ${client.user.username} YouTube`)
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`Visit Wavaca's YouTube Channel [here](https://www.youtube.com/channel/UCTB0RGol-BnYKe0XliITlYg?sub_confirmation=1)!`)
  .setFooter(`${prefix} | ${client.user.username}`)
  .setTimestamp()
  message.channel.send(youtubeEmbed)
  .then(message.react("▶️"));
  }

  module.exports.help = {
    name: "youtube"
}