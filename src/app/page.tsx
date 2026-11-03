'use client';

import { Board } from '@/components/Main/Board';
import { useKeyTracker } from '@/lib/useKeyTracker';
import { useMouseTracker } from '@/lib/useMouseTracker';

export default function Home() {
    // track pressed keys add push or remove them in the app state
    useKeyTracker();
    // track the mouse
    useMouseTracker();

    return (
        <main className="tablette:p-5 p-3">
            <Board />
        </main>
    );
}
