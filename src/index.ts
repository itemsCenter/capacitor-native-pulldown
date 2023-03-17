import { registerPlugin } from '@capacitor/core';

import type { PulldownListPlugin } from './definitions';

const PulldownList = registerPlugin<PulldownListPlugin>('PulldownList', {
  web: () => import('./web').then(m => new m.PulldownListWeb()),
});

export * from './definitions';
export { PulldownList };