const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
  const inviteEmbed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(`🤖 | ${client.user.username} Invite`)
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`You can invite ${client.user.username} [here](https://discordapp.com/api/oauth2/authorize?client_id=673273479306543120&permissions=8&scope=bot)!`)
  .setFooter(`${prefix} | ${client.user.username}`)
  .setTimestamp()
  message.channel.send(inviteEmbed)
  .then(message.react("🤖"));
}

  module.exports.help = {
    name: "invite"
}