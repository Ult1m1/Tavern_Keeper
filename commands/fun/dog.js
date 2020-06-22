/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const prefix = process.env.prefix;

module.exports = {
	name: 'dog',
	category: 'fun',
	description: 'Get a random picture of a dog.',
	aliases: ['dogs', 'doggo', 'puppy', 'puppies'],
	usage: `${prefix}dog`,
	guildOnly: true,
	run: async (client, message, args) => {
		const subReddits = ['dog', 'rarepuppers', 'puppies'];
		const random = subReddits[Math.floor(Math.random() * subReddits.length)];
		const img = await randomPuppy(random);

		const embed = new MessageEmbed()
			.setImage(img)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle(`From /r/${random}`)
			.setURL(`http://reddit.com/${random}`);

		message.channel.send(embed);
	},
};