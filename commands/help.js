const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
    
    if(message.author.id === `408289224761016332` || // wavaca#7911
      message.author.id === `400716545292107779` || // Senne#2930
      message.author.id === `383332117188444160` || // Tsunami#6271
      message.author.id === `615018910822957179` // Gmdfan1³#5874
      ) {
      
    const helpOwnerEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are my commands:`)
    .addField(`Wavaca (2)`, `**${prefix}buyrank**, **${prefix}youtube**`)
    .addField(`Moderation (1)`, `**${prefix}clear**`)
    .addField(`Leveling (2)`, `**${prefix}level**, **${prefix}lvl**`)
    .addField(`Other (6)`, `**${prefix}chatbot**,  **${prefix}invites**,  **${prefix}membercount**, **${prefix}ping**, **${prefix}say**, **${prefix}translate**`)
    .addField(`About (2)`, `**${prefix}botstats**, **${prefix}invite**`)
    .addField(`Owner (5)`, `**${prefix}createinv**, **${prefix}deop**, **${prefix}eval**, **${prefix}op**, **${prefix}serverlist**`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(helpOwnerEmbed)
    .then(message.react("🤖"));
      
  } else {
    
    const helpEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are my commands:`)
    .addField(`Wavaca (2)`, `**${prefix}buyrank**, **${prefix}youtube**`)
    .addField(`Moderation (1)`, `**${prefix}clear**`)
    .addField(`Leveling (2)`, `**${prefix}level**, **${prefix}lvl**`)
    .addField(`Other (6)`, `**${prefix}chatbot**,  **${prefix}invites**,  **${prefix}membercount**, **${prefix}ping**, **${prefix}say**, **${prefix}translate**`)
    .addField(`About (2)`, `**${prefix}botstats**, **${prefix}invite**`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(helpEmbed)
    .then(message.react("🤖"));
    }
  }

  module.exports.help = {
    name: "help"
}