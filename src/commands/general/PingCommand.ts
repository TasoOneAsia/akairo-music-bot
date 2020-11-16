import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class PingCommand extends Command {
  public constructor() {
    super('ping', {
      aliases: ['ping'],
      category: '⚙️ General',
      description: {
        content: "Check's Bot Latency to Discord API",
        usage: 'ping',
        examples: ['ping'],
      },
      ratelimit: 3,
    });
  }

  public exec(message: Message): Promise<Message> {
    const embed = new MessageEmbed()
      .setColor('#ff8f00')
      .setDescription(`**〽️ Latency to Discord API:** \`${this.client.ws.ping}ms\``);

    return message.util.send(embed);
  }
}
