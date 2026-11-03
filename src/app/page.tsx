'use client';

import { Board } from '@/components/Main/Board';
import { useKeyTracker } from '@/lib/useKeyTracker';

export default function Home() {
    // track pressed keys add push or remove them in the app state
    useKeyTracker();

    return (
        <main className="tablette:p-5 p-3">
            <Board />
        </main>
    );
}
