/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const prefix = process.env.prefix;

module.exports = {
	name: 'resetwarns',
	category: 'Moderation',
	aliases: ['delwarns', 'clearwarns', 'rwarns'],
	usage: `${prefix}clearwarns <@user | userid>`,
	description: 'Reset warnings of a specified person',
	run: async (client, message, args) => {


		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

		if(!user) {
			return message.channel.send(
				'Please specify a user to reset their warning.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(user.user.bot) {
			return message.channel.send(
				'Bot are not allowed to have warnings',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(message.author.id === user.id) {
			return message.channel.send(
				'You are not allowed to reset your warnings',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(1).join(' ');

		if(!Reason) {
			return message.channel.send(
				'You are not allowed to reset someone\'s warnings without a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === null) {
			return message.channel.send(`${user.user.tag} do not have any warnings`).then(message.delete()).then(embed => {embed.delete({ timeout: 5000 });});
		}

		db.delete(`warnings_${message.guild.id}_${user.id}`);
		const channel = message.guild.channels.cache.get('720997712602071098');
		const Embed = new MessageEmbed()
			.setAuthor('Member Warnings Reset', `${user.user.displayAvatarURL()}`)
			.setColor('RED')
			.setThumbnail(`${user.user.displayAvatarURL()}`)
			.addFields(
				{ name: 'Reset User', value: `${user.user} ID: ${user.id}` },
				{ name: 'Reset By', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Reset In', value: message.channel },
				{ name: 'Reason', value: Reason })
			.setTimestamp()
			.setFooter('Banned at');
		channel.send(Embed);
		const embed = new MessageEmbed()
			.setDescription(`**Your warnings have been reset in ${message.guild.name} | ${Reason}**`)
			.setColor('GREEN');
		user.send(embed);
		const sembed = new MessageEmbed();
		await message.channel.send(sembed.setDescription(`**${user.user.tag}'s warnings was reset. | ${Reason} **`).setColor('GREEN'));


	},
};