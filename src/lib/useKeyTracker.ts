import { useEffect } from 'react';

import { appState } from '@/store/appState';

/**
 * @description Track the keyboard pressed keys and push
 * or remove them from the app state
 */
export function useKeyTracker() {
    // push the pressed key in the app state pressed keys
    function handleKeyPress(ev: KeyboardEvent) {
        appState.pressedKeys.push(ev.code);
    }

    // remove the released key from the app state pressed keys
    function handleKeyRelease(ev: KeyboardEvent) {
        appState.pressedKeys = appState.pressedKeys.filter(
            (pressedKey) => pressedKey !== ev.code,
        );
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('keyup', handleKeyRelease);
        };
    });
}
