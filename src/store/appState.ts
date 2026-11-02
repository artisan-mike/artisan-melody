/**
 * @fileoverview this file contains the app state
 */

import { proxy } from 'valtio';

import { AppSate } from './types';

export const appState = proxy<AppSate>({
    instrument: 'synth',
    pressedKeys: [],
});
