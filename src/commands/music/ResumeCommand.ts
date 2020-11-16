import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { BasicEmbed, SendErrorEmbed } from '../../utils/EmbedUtils';

export default class ResumeMusicCommand extends Command {
  public constructor() {
    super('resume', {
      aliases: ['resume'],
      description: {
        content: 'Resumes current music track',
        usage: 'resume',
        examples: ['resume'],
      },
      category: 'Music',
      ratelimit: 3,
    });
  }

  public async exec(msg: Message): Promise<Message | void> {
    // If queue is currently not paused
    if (!this.client.player.getQueue(msg).paused) return SendErrorEmbed(msg, 'The bot is not currently paused!');

    this.client.player.resume(msg);

    const newMsg = await BasicEmbed(msg, 'Bot has been resumed');

    this.client.log.debug(`[MUSIC] Queue resumed by ${msg.author.tag}`);

    msg.delete();

    newMsg.delete({ timeout: 3000 });
  }
}
