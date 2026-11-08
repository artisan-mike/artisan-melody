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
        <main className="tablette:p-5 min-h-full overflow-scroll p-3 landscape:bg-red-300">
            <Board />
        </main>
    );
}
