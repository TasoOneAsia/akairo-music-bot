import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { footerText } from '../../Config';

export default class HelpCommand extends Command {
  public constructor() {
    super('help', {
      aliases: ['help', 'h'],
      description: {
        content: 'View help for available commands',
        usage: 'help [command]',
        examples: ['help', 'help play', 'help queue'],
      },
      ratelimit: 5,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          default: null,
        },
      ],
      category: '⚙️ General',
    });
  }

  public exec(msg: Message, { command }: { command: Command }): Promise<Message> {
    // Create Embed
    // prettier-ignore
    const embed = new MessageEmbed()
      .setFooter(`Requested by ${msg.author.tag} | ${footerText}`, msg.author.avatarURL())
      .setColor('#ff8f00')
      .setAuthor('Command Help')

    if (command) {
      embed.setTitle(`Command Help for ${command}`);
      embed.addFields([
        { name: 'Description:', value: command.description.content || 'No description found' },
        { name: 'Aliases', value: command.aliases ? command.aliases.map((v) => `\`${v}\``) : 'No aliases found' },
        { name: 'Usage', value: command.description.usage || 'No usage found' },
        {
          name: 'Examples',
          value: command.description.examples
            ? command.description.examples.map((v: string) => `\`${this.client.commandHandler.prefix}${v}\``)
            : 'No examples found',
        },
      ]);
      embed.setTitle(`Help for ${command}`);
      return msg.channel.send(embed);
    }

    for (const category of this.handler.categories.values()) {
      if (['default'].includes(category.id)) continue;
      embed.addField(
        category.id,
        category
          .filter((cmd) => cmd.aliases.length > 0)
          .map((cmd) => `**\`${cmd}\`**`)
          .join(', ') || 'No commands for this category'
      );
    }

    embed.setDescription(`*For further help use ${this.client.commandHandler.prefix}help [command]*`);

    return msg.channel.send(embed);
  }
}
