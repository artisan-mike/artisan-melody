import { useEffect } from 'react';

import { appState } from '@/store/appState';

export function usePointerTracker() {
    useEffect(() => {
        document.addEventListener('pointerdown', (ev) => {
            appState.pointerIds.add(ev.pointerId);
        });
        document.addEventListener('pointerup', (ev) => {
            appState.pointerIds.delete(ev.pointerId);
        });
    });
}
