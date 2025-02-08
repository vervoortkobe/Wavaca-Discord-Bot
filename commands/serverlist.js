const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
    if(message.author.id === `408289224761016332` || // wavaca#7911
       message.author.id === `400716545292107779` || // Senne#2930
       message.author.id === `383332117188444160`    // Tsunami#6271
      ) {
      
      message.channel.send(`☑️ | I have sent it in your dm, ${message.author}!`);
    
      //message.author.send(`__**Serverlist (${client.guilds.size}):**__`);

      let servers = "";
        client.guilds.cache.forEach(guild => {
            servers = servers.concat(`\n\`${guild.name}\` - \`${guild.id}\` - \`${guild.memberCount}\``)
        });

      const serverlistEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`⚙️ | ${client.user.username} Serverlist`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`Servers (${client.guilds.cache.size})`, servers)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.author.send(serverlistEmbed)
      .then(message.react("⚙️"));

    } else {

      return message.channel.send(`❌ | You don't have permissions to use this command!`);
    }
  }
  
  module.exports.help = {
    name: "serverlist"
  }