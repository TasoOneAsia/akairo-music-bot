import { Track } from 'discord-player';
import { Message, MessageEmbed, EmbedField, MessageEmbedAuthor } from 'discord.js';
import { footerText } from '../Config';
import { ErrorCol, SuccessCol } from './ColorsUtils';

interface EmbedOptions {
  color?: 'success' | 'warning' | 'error' | 'random';
  description?: string;
  fields?: EmbedField[];
  title?: string;
  thumb?: string;
  author?: MessageEmbedAuthor;
  footer?: boolean;
}

interface MusicEmbed {
  type: 'playing' | 'added' | 'stop' | 'pause' | 'resume';
  track: Track;
}

// export function SendEmbed(msg: Message, { description, color, author, footer, image, fields, title }): MessageEmbed {
//   const embed = new MessageEmbed()

//   if (author) embed.setAuthor(author.name, author.iconURL)

//   if (title) embed.setTitle()

//   return
// };

export function SendErrorEmbed(msg: Message, description: string, type?: 'permission' | 'internal') {
  const embed = new MessageEmbed()
    .setFooter(`Requested by ${msg.author.tag} | MusicBot | Created by Taso`, msg.author.avatarURL())
    .setTitle(`❌ Error ❌`)
    .setDescription(description)
    .setColor(ErrorCol);

  if (type === 'permission') embed.setTitle(`❌ Missing Permissions ❌`);

  return msg.channel.send(embed);
}

export function MusicEmbed(msg: Message, { type, track }: MusicEmbed): Promise<Message> {
  let playerTitle: string;

  if (type === 'playing') {
    playerTitle = 'Starting Track';
  }

  if (type === 'added') {
    playerTitle = 'Added To Queue';
  }

  const embed = new MessageEmbed()
    .setDescription(`[Click here for URL](${track.url})`)
    .setFooter(`MusicBot | Created by Taso`, msg.author.avatarURL())
    // .setAuthor(`🎵 ${playerTitle} 🎵`);
    .setFooter(footerText)
    .setThumbnail(track.thumbnail)
    .addFields([
      { name: 'Track Title', value: track.title },
      { name: 'Duration', value: track.duration, inline: true },
      { name: 'Requested By', value: track.requestedBy.tag, inline: true },
      { name: 'Remaining in Queue', value: (track.queue.tracks.length - 1).toString(), inline: true },
    ])
    .setColor(SuccessCol)
    .setAuthor(`🎵 ${playerTitle} 🎵`);

  return msg.channel.send(embed);
}
