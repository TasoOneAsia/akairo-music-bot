import { Message } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Track } from 'discord-player';
import { MusicEmbed } from '../../utils/EmbedUtils';

export default class TrackStartListener extends Listener {
  public constructor() {
    super('musicNowStaring', {
      emitter: 'player',
      event: 'trackStart',
      category: 'music',
    });
  }

  public async exec(msg: Message, track: Track): Promise<Message> {
    this.client.log.debug(`[MUSIC] Track started: ${track.title}`);
    return MusicEmbed(msg, { type: 'playing', track });
  }
}
