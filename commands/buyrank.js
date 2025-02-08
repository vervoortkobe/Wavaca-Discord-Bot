const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
    
    const buyrankEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`💠 | ${client.user.username} Buy Rank`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`You can buy a rank on WVC - Clan [here](https://donatebot.io/checkout/455778791164477441?buyer=383332117188444160)!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(buyrankEmbed)
    .then(message.react("💠"));
  }

  module.exports.help = {
    name: "buyrank"
}