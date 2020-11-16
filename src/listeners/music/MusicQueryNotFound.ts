import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { SendErrorEmbed } from '../../utils/EmbedUtils';
export default class MusicQueryNotFound extends Listener {
  constructor() {
    super('MusicQueryNull', {
      emitter: 'player',
      event: 'noResults',
      category: 'music',
    });
  }

  public async exec(msg: Message, query: string): Promise<void> {
    this.client.log.debug(`[Music] No results found for ${query}`);
    const errMsg = await SendErrorEmbed(msg, `No results found for ${query}`);
    errMsg.delete({ timeout: 15000 });
  }
}
