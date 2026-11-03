import { useEffect } from 'react';

import { appState } from '@/store/appState';

/**
 * @description Detect when the mouse button is pressed
 */
export function useMouseTracker() {
    function handleMousePress() {
        appState.isMousePressed = true;
    }

    function handleMouseRelease() {
        appState.isMousePressed = false;
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMousePress);
        document.addEventListener('mouseup', handleMouseRelease);
        document.addEventListener('mouseleave', handleMouseRelease);

        return () => {
            document.removeEventListener('mousedown', handleMousePress);
            document.removeEventListener('mouseup', handleMouseRelease);
            document.removeEventListener('mouseleave', handleMouseRelease);
        };
    });
}
