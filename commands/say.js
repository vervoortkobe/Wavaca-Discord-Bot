const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | I couldn't say that message, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

  const sayMessage = args.join(' ');
  
  if(!sayMessage) return message.channel.send(`❌ | Pls define the message to say!`);
  
  message.delete();
  
  message.channel.send(sayMessage);
  
  }

  module.exports.help = {
    name: "say"
}