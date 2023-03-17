/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin , registerWebPlugin } from '@capacitor/core';

import type { PulldownListPlugin, PulldownListItem, ShowOptions } from './definitions';

export class PulldownListWeb extends WebPlugin implements PulldownListPlugin {
  constructor() {
    super({
      name: 'PulldownList',
      platforms: ['web'],
    });
  }

  async show(_options: ShowOptions): Promise<void> {
    console.warn('show is not implemented on web platform.');
    return;
  }

  async setContent(_items: PulldownListItem[]): Promise<void> {
    console.warn('setContent is not implemented on web platform.');
    return;
  }

  async setPosition(_x: number, _y: number): Promise<void> {
    console.warn('setPosition is not implemented on web platform.');
    return;
  }
}

const PulldownList = new PulldownListWeb();

export { PulldownList };

registerWebPlugin(PulldownList);
