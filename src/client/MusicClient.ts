import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { Logger } from 'tslog';
import { join } from 'path';
import DebugLogger from '../utils/DebugLogger';
import { Player } from 'discord-player';

// Import Configuration Constants
import { botPrefix, musicOptions } from '../Config';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    log: Logger;
    player: Player;
  }
}

export default class MusicClient extends AkairoClient {
  // Attach Logger
  public log = DebugLogger;

  // Attach Music Player
  public player = new Player(this, {
    leaveOnEmpty: musicOptions.leaveOnEmpty,
    leaveOnStop: musicOptions.leaveOnStop,
    leaveOnEnd: musicOptions.leaveOnEnd,
  });

  // Loads all files in the '../listeners/' directory as Listeners
  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
  });
  // Loads all files in the '../commands/' directory as Commands
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: botPrefix,
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 6e4,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the commmand...`,
        modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the commmand...`,
        timeout: 'Command timedout',
        ended: 'You reached the maximum retries, command cancelled.',
        retries: 3,
        time: 3e4,
      },
    },
  });

  // Bot Initialization Function
  private _init(): void {
    const initLog = this.log.getChildLogger({
      name: 'Bot Init Function',
      prefix: ['[BotInit]'],
    });

    initLog.debug('Starting Initialization');
    initLog.info('Setting Up Listener Handler');
    this.commandHandler.useListenerHandler(this.listenerHandler);

    initLog.debug('Setting up ListenerHandler emitters');
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      player: this.player,
      process,
    });
    initLog.debug('Emitters Set');
    initLog.info('Loading Command and Listener Handlers');
    this.commandHandler.loadAll();
    initLog.debug('Command Handler Loaded');
    this.listenerHandler.loadAll();
    initLog.debug('Listener Handler Loaded');
  }

  public async start(): Promise<string> {
    this._init();
    this.log.debug('Start Complete');
    return this.login(process.env.TOKEN);
  }
}
