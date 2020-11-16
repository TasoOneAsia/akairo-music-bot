import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Track } from 'discord-player';

export default class MusicResultsFound extends Listener {
  public constructor() {
    super('MusicResultsFound', {
      emitter: 'player',
      event: 'searchResults',
      category: 'music',
    });
  }

  public async exec(msg: Message, query: string, tracks: Track[]) {
    this.client.log.debug(`[MUSIC] Query First Result: ${tracks[0].title}, adding to queue`);
    await this.client.player.play(msg, tracks[0]);
  }
}
