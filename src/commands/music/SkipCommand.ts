import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { BasicEmbed, SendErrorEmbed } from '../../utils/EmbedUtils';

export default class SkipMusicCommand extends Command {
  public constructor() {
    super('skip', {
      aliases: ['skip'],
      description: {
        content: 'Skip currently playing song',
        usage: 'skip',
        examples: ['skip'],
      },
      category: 'Music',
      ratelimit: 3,
    });
  }

  public async exec(msg: Message): Promise<Message> {
    if (!this.client.player.isPlaying(msg)) return SendErrorEmbed(msg, 'The queue is empty, cannot pause');

    msg.delete({ timeout: 1000 });

    this.client.player.skip(msg);

    const newMsg = await BasicEmbed(msg, 'Skipped the current track');

    this.client.log.debug(`[MUSIC] Current was skipped by ${msg.author.tag}`);

    newMsg.delete({ timeout: 3000 });
  }
}
