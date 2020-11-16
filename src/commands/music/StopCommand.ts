import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { SendErrorEmbed } from '../../utils/EmbedUtils';
import { WarningCol } from '../../utils/ColorsUtils';

export default class StopMusicCommand extends Command {
  public constructor() {
    super('stop', {
      aliases: ['stop'],
      description: {
        content: 'Stops and removes the current music queue',
        usage: 'stop',
        examples: ['stop'],
      },
      category: 'Music',
      ratelimit: 3,
    });
  }

  public async exec(msg: Message): Promise<Message> {
    if (!this.client.player.isPlaying(msg)) return SendErrorEmbed(msg, 'The Bot is not playing anything');

    this.client.player.stop(msg);

    this.client.log.debug(`[MUSIC] Queue has been stopped by ${msg.author.tag}`);

    const embed = new MessageEmbed().setColor(WarningCol).setDescription('Queue has been cleared');
    //Clean up messages
    msg.channel.send(embed);
  }
}
