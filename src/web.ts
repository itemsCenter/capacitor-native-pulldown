import { WebPlugin } from '@capacitor/core';

import type { DropdownPlugin } from './definitions';

export class DropdownWeb extends WebPlugin implements DropdownPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
