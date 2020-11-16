import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { SendErrorEmbed } from '../../utils/EmbedUtils';

export default class PlayMusicCommand extends Command {
  public constructor() {
    super('play', {
      aliases: ['play', 'p'],
      description: {
        content: 'Plays music or adds to the current music queue',
        usage: 'play <Youtube/SoundCloud/Spotify URL or Key Words>',
        examples: ['play Never Gonna Give You Up', 'p https://www.youtube.com/watch?v=5m4ZkEqQrn0'],
      },
      category: 'Music',
      args: [
        {
          id: 'query',
          type: 'string',
          match: 'rest',
          prompt: {
            start: (msg: Message): string =>
              `${msg.author}, enter a SoundCloud, Spotify, Youtube Link, or even keywords to play a song`,
            retry: (msg: Message): string => `${msg.author}, you cannot search for nothing you egg`,
          },
        },
      ],
      ratelimit: 3,
    });
  }

  public async exec(msg: Message, { query }: { query: string }): Promise<Message> {
    if (!msg.member.voice.channel) {
      return SendErrorEmbed(msg, `You are not in a voice channel. Please join one to be able to play music`);
    }

    try {
      this.client.log.debug(`Attempting Music Query for ${query}`);
      await this.client.player.play(msg, query);
    } catch (e) {
      this.client.log.error(e);
    }

    msg.delete();
  }
}
