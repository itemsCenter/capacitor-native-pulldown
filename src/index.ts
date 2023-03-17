import { registerPlugin } from '@capacitor/core';

import type { DropdownPlugin } from './definitions';

const Dropdown = registerPlugin<DropdownPlugin>('Dropdown', {
  web: () => import('./web').then(m => new m.DropdownWeb()),
});

export * from './definitions';
export { Dropdown };
