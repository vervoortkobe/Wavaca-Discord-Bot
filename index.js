const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const client = new Discord.Client({ disableEveryone: true, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
const lvl = require("./lvl.json");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });


  client.on("ready", async () => {
    console.log(`${client.user.tag} was started!`);
    client.user.setActivity(`Wavaca\'s Youtube Channel, ${prefix}help | ${client.user.username}`, {type: "WATCHING"});
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("guildCreate", guild => {
    console.log(`I have joined ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);
  });
   
  client.on("guildDelete", guild => {
    console.log(`I have left ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//ANTISPAM

  const AntiSpam = require('discord-anti-spam');
  const antiSpam = new AntiSpam({
      warnThreshold: 5,
      kickThreshold: 10,
      banThreshold: 15,
      maxInterval: 2000,
      warnMessage: ':helmet_with_cross: | **AUTOMOD** has **warned ${@user}** for **spamming**!',
      kickMessage: ':helmet_with_cross: | **AUTOMOD** has **kicked ${user_tag}** for **spamming**!',
      banMessage: ':helmet_with_cross: | **AUTOMOD** has **banned ${user_tag}** for **spamming**!',
      maxDuplicatesWarning: 5,
      maxDuplicatesKick: 10,
      maxDuplicatesBan: 15,
      exemptPermissions: ['ADMINISTRATOR'],
      ignoreBots: true,
      verbose: true,
      ignoredUsers: []
  });

  client.on('message', async message => {
    if(!message.channel.id == "476402182237847562" || !message.channel.id == "750764561610833981") antiSpam.message(message);
  }); 

/////////////////////////////////////////////////////////////////////////////////////////////
//JOIN_LEAVE

  client.on("guildMemberAdd", member => {
    let jlChannel = member.guild.channels.cache.find(c => c.id === "506767779836198912");
    if(!jlChannel) return;
    let adminjlChannel = member.guild.channels.cache.find(c => c.id === "720640685744586762");
    if(!adminjlChannel) return;
    
    const joinEmbed = new Discord.MessageEmbed()
    .setColor(0x00ff00)
    .setTitle("👋 Join")
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Hey, ***${member.user.tag}***!\nWelcome to ${member.guild.name}.`)
    .setFooter(`Join • ${member.guild.memberCount} members`)
    .setTimestamp()
    jlChannel.send(joinEmbed);
    adminjlChannel.send(joinEmbed);
    
    client.channels.cache.get("703200797545988116").setName(`『📈』Total: ${member.guild.memberCount}`);
    client.channels.cache.get("703201067348918312").setName(`『😄』Members: ${member.guild.memberCount - member.guild.members.cache.filter(member => member.user.bot).size}`);
    client.channels.cache.get("703201095358480474").setName(`『🤖』Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  });

  client.on("guildMemberRemove", member => {
//    let jlChannel = member.guild.channels.cache.find(c => c.id === "506767779836198912");
//    if(!jlChannel) return;
    let adminjlChannel = member.guild.channels.cache.find(c => c.id === "720640685744586762");
    if(!adminjlChannel) return;
    
    const leaveEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle("😭 Leave")
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Bye, ***${member.user.tag}***!\nHe/she left ${member.guild.name}.`)
    .setFooter(`Leave • ${member.guild.memberCount} members`)
    .setTimestamp()
//    jlChannel.send(leaveEmbed);
    adminjlChannel.send(leaveEmbed);
    
    client.channels.cache.get("703200797545988116").setName(`『📈』Total: ${member.guild.memberCount}`);
    client.channels.cache.get("703201067348918312").setName(`『😄』Members: ${member.guild.memberCount - member.guild.members.cache.filter(member => member.user.bot).size}`);
    client.channels.cache.get("703201095358480474").setName(`『🤖』Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOROLE

  client.on("guildMemberAdd", member => {
    let autorole = member.guild.roles.cache.find(r => r.id === "506434510636711936");
    if(!autorole) return;
    
    member.roles.add(autorole);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_DELETE

  client.on("messageDelete", (messageDelete) => {

    const msglogChannel = messageDelete.guild.channels.cache.find(c => c.name === `msglogs`);
    if(!msglogChannel) return;

    const msgdelLogEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MESSAGE_DELETE`, `${messageDelete.author.tag} **deleted a message in ${messageDelete.channel}**!`)
    .addField(`Deleted Message`, messageDelete.content)
    .setFooter(`${prefix} | ${client.user.username}`)
    msglogChannel.send(msgdelLogEmbed);
  });

//MESSAGE_UPDATE

  client.on("messageUpdate", async (oldMsg, newMsg) => {

    if(oldMsg.content === "" || newMsg.content === "") return;
    const msglogChannel = newMsg.guild.channels.cache.find(c => c.name === "msglogs");
    if(!msglogChannel) return;

    msgupdLogEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .setThumbnail(newMsg.author.displayAvatarURL)
    .addField(`MESSAGE_UPDATE`, `${newMsg.author.tag} **updated a message in ${newMsg.channel}**!`)
    .addField("Old Message", "\`\`\`" + oldMsg.content + "\`\`\`")
    .addField("New Message", "\`\`\`" + newMsg.content + "\`\`\`")
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    msglogChannel.send(msgupdLogEmbed);
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//LEVELING
    if(!lvl[message.author.id]) {
      lvl[message.author.id] = {
        lvl: 0
      };
    }

    let lvlAmt = Math.floor(Math.random() * 1) + 1;
    let baseAmt = Math.floor(Math.random() * 1) + 1;

    if(lvlAmt === baseAmt) {
      lvl[message.author.id] = {
        lvl: lvl[message.author.id].lvl + lvlAmt
      };
      fs.writeFile("./lvl.json", JSON.stringify(lvl), (err) => {
        if(err) console.log(err)
      });
    }
    
    let uLvl = lvl[message.author.id].lvl;
//LVL1
      if(uLvl > 999 && uLvl < 1001) {
        let xp = 1;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 1");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/2000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL2
      if(uLvl > 1999 && uLvl < 2001) {
        let xp = 2;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 2");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/3000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL3
      if(uLvl > 2999 && uLvl < 3001) {
        let xp = 3;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 3");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/4000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL4
      if(uLvl > 3999 && uLvl < 4001) {
        let xp = 4;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 4");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/5000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL5
      if(uLvl > 4999 && uLvl < 5001) {
        let xp = 5;
        
        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 5");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/6000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL6
      if(uLvl > 5999 && uLvl < 6001) {
        let xp = 6;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 6");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/7000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL7
      if(uLvl > 6999 && uLvl < 7001) {
        let xp = 7;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 7");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/8000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL8
      if(uLvl > 7999 && uLvl < 8001) {
        let xp = 8;
      
        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 8");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/9000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL9
      if(uLvl > 8999 && uLvl < 9001) {
        let xp = 9;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 9");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/10000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL10
      if(uLvl > 9999 && uLvl < 10001) {
        let xp = 10;

        if(message.guild.id === "455778791164477441") {
          let lvlrole = message.guild.roles.cache.find(r => r.name === "🏆 Level 10");
          if(!lvlrole) return console.log("NO LVLROLE FOUND");
          message.member.roles.add(lvlrole);
        }

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/~\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
    
/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD ANTISCOLD
    
    if(message.content.includes("discord.gg") ||
       message.content.includes("discordapp.com/invite") ||
       message.content.includes("discord.com/invite")
      ) {
      
      if(message.guild.id !== "455778791164477441") return;
      if(message.channel.id === "714181401410535575") return;
      
      let adminRole = message.guild.roles.cache.find(r => r.id === "643069808903979013");
      if(message.member.hasPermission("ADMINISTRATOR") ||
         message.member.hasPermission("BAN_MEMBERS") ||
         message.member.roles.cache.has(adminRole)
        ) {
        return;
      } else {
      
      message.delete();
      
      const linkEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(":warning: AUTOMOD")
      .setDescription(`***:white_check_mark: AUTOMOD warned*** ${message.author}, \nbecause of **sending invites**!`)
      .setTimestamp()
      message.channel.send(linkEmbed);
      
      const linkPmEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(":warning: AUTOMOD")
      .setDescription(`You have been **warned in ${message.guild.name}**, \nbecause of **sending invites**!\n\`\`\`html\n${message.content}\`\`\`\n\n\nIf you think this is a mistake, pls report this to <@408289224761016332> (Tsunami#6271).`)
      .setTimestamp()
      message.author.send(linkPmEmbed);
      }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
//CHATBOT ON
    
    let chatbots = JSON.parse(fs.readFileSync("./chatbots.json", "utf-8"));
    
    if(!chatbots[message.author.id]) {
      chatbots[message.author.id] = {
        chatbots: "off"
      }
    }
    let chatbot = chatbots[message.author.id].chatbots;
    
    if(chatbot === "on") {

      if(message.content === `${prefix}chatbot off`) {
        
        let chatbots = JSON.parse(fs.readFileSync("./chatbots.json", "utf-8"));

        chatbots[message.author.id] = {
            chatbots: "off"
        };

        fs.writeFile("./chatbots.json", JSON.stringify(chatbots), (err) => {
          if(err) console.log(err);
        });

        return message.channel.send(`☑️ | I have set your chatbot to: **off**!`);
      }
      
      let inputmessage = encodeURIComponent(message.content);
      let {data} = await fetch;

      fetch(`https://some-random-api.ml/chatbot?message=${inputmessage}`)
      .then(res => res.json()).then(data => {
        if(!data.response) return message.channel.send(`❌ | There went something wrong! Pls try again!`);
      
        if(!inputmessage) {
          console.log("ERROR: CHATBOT ON: NO MESSAGE.CONTENT! Illegal exception!");
        }

        message.channel.send(data.response);
      })
      .catch(err => message.channel.send(`❌ | Something went wrong while fetching the chatbot's response! Pls try again!`));
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
   
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);

/////////////////////////////////////////////////////////////////////////////////////////////
//CHATBOT

    if(command === `${prefix}chatbot`) {
      if(!args[0]) {
        const chatbotUsageEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`🤖 | ${client.user.username} Chatbot`)
        .setDescription(`Usage: **${prefix}chatbot <on/off>**`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        return message.channel.send(chatbotUsageEmbed);
      }
  
      if(args[0] === "on") {
      
        let chatbots = JSON.parse(fs.readFileSync("./chatbots.json", "utf-8"));

        chatbots[message.author.id] = {
          chatbots: args[0]
        };

        fs.writeFile("./chatbots.json", JSON.stringify(chatbots), (err) => {
          if(err) console.log(err);
        });
      
        message.channel.send(`☑️ | I have set your chatbot to: **${args[0]}**!`);
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////

});

client.login(process.env.TOKEN);