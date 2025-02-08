const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

  if(message.author.id === "408289224761016332") { //Tsunami#6271
    
    let cmd = args.join(" ");
    if(!cmd) return message.channel.send(`❌ | Please include a code to evaluate!`);
    
    if(cmd.includes("token") || cmd.includes("config") || cmd.includes("process.env")) return message.channel.send(`❌ | You are not allowed to do that!`);
    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    message.delete(100);
    try {
      const code = args.slice(0).join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } else {
    return message.channel.send(`❌ | You don't have the permissions to do this!`);
  }
};

module.exports.help = {
  name: "eval"
}