const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    let adminRole = message.guild.roles.find(r => r.name ==="OP");

    if(message.author.id === `408289224761016332` || // Wavaca#7911
       message.author.id === `400716545292107779` || // Tsunami#6271
       message.author.id === `383332117188444160`) {    // Senne#2930
      
      if(message.member.roles.cache.has(adminRole)) {
        
        return message.channel.send(`❌ | I couldn't give you the OP role, because you already have it!`);
      }

      if(!adminRole) return message.channel.send(`❌ | I couldn't delete the OP role, because there is no OP role!`);
      adminRole.delete();

      message.channel.send(`☑️ | I deleted the OP role successfully!`)
        
    } else {

    return message.channel.send(`❌ | You don't have permissions to use this command!`);
    
    }
  }

  module.exports.help = {
    name: "deop"
}