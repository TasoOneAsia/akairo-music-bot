import { Message } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Queue, Track } from 'discord-player';
import { MusicEmbed } from '../../utils/EmbedUtils';

export default class AddedToQueueListener extends Listener {
  public constructor() {
    super('AddedToQueue', {
      event: 'trackAdd',
      emitter: 'player',
      category: 'music',
    });
  }

  public async exec(msg: Message, queue: Queue, track: Track): Promise<Message> {
    return MusicEmbed(msg, { type: 'added', track });
  }
}
