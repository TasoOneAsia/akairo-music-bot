import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
  public constructor() {
    super('readyListener', {
      emitter: 'client',
      event: 'ready',
      category: 'client',
    });
  }

  public exec(): void {
    this.client.log.debug('Setting Bot Presence');
    this.client.user.setPresence({
      activity: {
        type: 'WATCHING',
        name: `for ${this.client.commandHandler.prefix}help command`,
      },
    });

    this.client.log.info(`${this.client.user.tag} has started sucessfully and is ready!`);
  }
}
