import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { SendErrorEmbed, BasicEmbed } from '../../utils/EmbedUtils';

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

  public async exec(msg: Message): Promise<void | Message> {
    if (!this.client.player.isPlaying(msg)) return SendErrorEmbed(msg, 'The Bot is not playing anything');

    this.client.player.stop(msg);

    this.client.log.debug(`[MUSIC] Queue has been stopped by ${msg.author.tag}`);

    //Clean up messages
    msg.delete();

    const newMsg = await BasicEmbed(msg, 'Queue has been stopped.');

    newMsg.delete({ timeout: 10000 });
  }
}
