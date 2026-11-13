'use client';

import { Board } from '@/components/Main/Board';
import { useKeyTracker } from '@/lib/useKeyTracker';
import { usePointerTracker } from '@/lib/usePointerTracker';

export default function Home() {
    // track pressed keys add push or remove them in the app state
    useKeyTracker();
    // track the mouse
    usePointerTracker();

    return (
        <main className="tablette:p-5 min-h-screen p-3">
            <Board />
        </main>
    );
}
