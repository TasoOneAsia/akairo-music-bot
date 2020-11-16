import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { BasicEmbed, SendErrorEmbed } from '../../utils/EmbedUtils';

export default class PauseMusicCommand extends Command {
  public constructor() {
    super('pause', {
      aliases: ['pause'],
      description: {
        content: 'Pauses current music track',
        usage: 'pause',
        examples: ['pause'],
      },
      category: 'Music',
      ratelimit: 3,
    });
  }

  public async exec(msg: Message): Promise<Message | void> {
    // Return if bot is already paused
    if (this.client.player.getQueue(msg).paused) return SendErrorEmbed(msg, 'The bot is already paused!');

    this.client.player.pause(msg);

    this.client.log.debug(`[MUSIC] Player has been paused by ${msg.author.tag}`);

    const newMsg = await BasicEmbed(msg, 'Bot has been paused');

    msg.delete();

    newMsg.delete({ timeout: 3000 });
  }
}
