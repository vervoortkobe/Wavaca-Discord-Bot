const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    if(!args[0]) {
      message.guild.fetchInvites()
      .then(invites => {

        let userinvites = invites.find(invite => invite.inviter.id === message.author.id);
        let inviteuses = userinvites.uses;

        if(inviteuses >= 1) {
            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`You have invited \`${inviteuses}\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));

        } else {

            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`You have invited \`0\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));
        }
      });
    }

    let member = message.mentions.users.first();
    if(member) {

      message.guild.fetchInvites()
      .then(invites => {
  
        let userinvites = invites.find(invite => invite.inviter.id === member.id);
        let inviteuses = userinvites.uses;

        if(inviteuses >= 1) {
  
            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(member.displayAvatarURL())
            .setDescription(`${member} has invited \`${inviteuses}\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));

        } else {

            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(member.displayAvatarURL())
            .setDescription(`${member} has invited \`0\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));

        }
      });

    } else {
        
      message.guild.members.fetch(args[0])
      .then(member => {
        if(!member) return message.channel.send(`❌ | Pls mention a valid member of this server!`);

        message.guild.fetchInvites()
        .then(invites => {

          let userinvites = invites.find(invite => invite.inviter.id === member.id);
          let inviteuses = userinvites.uses;

          if(inviteuses >= 1) {

            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`${member.user} has invited \`${inviteuses}\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));

          } else {
    
            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`🙋 | ${client.user.username} Invites`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`${member.user} has invited \`0\` users to this server!`)
            .setFooter(`${prefix} | ${client.user.username}`)
            .setTimestamp()
            return message.channel.send(invitesEmbed)
            .then(message.react("☑️"));
          }
        });

      }).catch(err => {
        return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      });
    }
  }

  module.exports.help = {
    name: "invites"
}