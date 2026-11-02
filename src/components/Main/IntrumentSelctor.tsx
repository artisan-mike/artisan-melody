import {
    ArrowFatLinesDownIcon,
    ArrowFatLinesUpIcon,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { appState } from '@/store/appState';
import { Instrument } from '@/store/types';

import { Button } from '../sharables/Button';

export function InstrumentSelector() {
    const instruments: Instrument[] = ['Synth', 'Metal-Synth', 'Membrane'];
    const [instrumentIndex, setInstrumentIndex] = useState(0);

    function handleButtonUpClick() {
        if (instrumentIndex < 1) return;
        setInstrumentIndex(instrumentIndex - 1);
    }

    function handleButtonDownClick() {
        if (instrumentIndex > instruments.length - 2) return;
        setInstrumentIndex(instrumentIndex + 1);
    }

    useEffect(() => {
        appState.instrument = instruments[instrumentIndex];
    });

    return (
        <div className="flex">
            <p className="text-text-strong mr-3 flex w-8 items-center justify-center rounded-sm border-2 border-b-0 border-l-0 border-t-gray-900 border-r-gray-900 bg-gray-300 text-center text-3xl outline-2 outline-gray-900">
                {instruments[instrumentIndex]}
            </p>
            <div className="text-stroke-weak flex flex-col gap-2 text-3xl">
                <Button onClick={handleButtonUpClick}>
                    <ArrowFatLinesUpIcon weight="fill" />
                </Button>
                <Button onClick={handleButtonDownClick}>
                    <ArrowFatLinesDownIcon weight="fill" />
                </Button>
            </div>
        </div>
    );
}
