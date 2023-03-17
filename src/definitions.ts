import type { PluginListenerHandle } from '@capacitor/core';

export interface PulldownListPlugin {
  show(options: ShowOptions): Promise<void>;
  setContent(items: PulldownListItem[]): Promise<void>;
  setPosition(x: number, y: number): Promise<void>;
  addListener(
    eventName: 'itemSelected',
    listenerFunc: (item: PulldownListItem) => void,
  ): PluginListenerHandle;
}

export interface PulldownListItem {
  id: string;
  title: string;
  icon?: string;
}

export interface ShowOptions {
  x: number;
  y: number;
}
