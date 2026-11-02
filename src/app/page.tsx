'use client';

import { Board } from '@/components/Main/Board';
import { useKeyTracker } from '@/lib/useKeyTracker';

export default function Home() {
    useKeyTracker();
    return (
        <main>
            <Board />
        </main>
    );
}
