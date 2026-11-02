'use client';

import { cn } from 'cn';
import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useSnapshot } from 'valtio';

import { useInstrument } from '@/lib/useInstrument';
import { appState } from '@/store/appState';
import { Note, ToneJsInstrument } from '@/store/types';

interface KeyProps extends React.ComponentProps<'li'> {
    note: Note;
}

export function Key({
    note: { pitch, type, key },
    className,
    ...rest
}: KeyProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { pressedKeys } = useSnapshot(appState);
    const { instrument: instrumentName } = useSnapshot(appState);

    // this is checked on every render
    const isThisKeyPressed = !!pressedKeys.find(
        (pressedKey) => pressedKey === key,
    );

    // contains the instrument that will be assigned later in the useEffect
    const instrument = useRef<ToneJsInstrument | null>(null);

    // create an instrument on the first render and when
    // the instrument name state change
    useEffect(() => {
        instrument.current = useInstrument(instrumentName);
    }, [instrumentName]);

    // play a note when the button is pressed
    async function handleButtonPress() {
        if (!instrument.current) return;
        await Tone.start();
        instrument.current.triggerAttack(
            `${pitch}${type === 'sharp' ? '#' : ''}4`,
            Tone.now(),
        );
    }

    // stop the note when the button is released
    async function handleButtonRelease() {
        if (!instrument.current) return;
        await Tone.start();
        instrument.current.triggerRelease(Tone.now());
    }

    // play a note when a specific keyboard key is pressed in the app state
    useEffect(() => {
        if (!instrument.current) return;

        if (isThisKeyPressed) {
            instrument.current.triggerAttack(
                `${pitch}${type === 'sharp' ? '#' : ''}4`,
                Tone.now(),
            );
        } else {
            instrument.current.triggerRelease(Tone.now());
        }
    }, [pressedKeys, instrumentName, pitch, type, key, isThisKeyPressed]);

    return (
        <li
            className={cn(
                'relative w-full overflow-visible',
                type === 'sharp' && 'w-0',
                className,
            )}
            {...rest}
        >
            <button
                ref={buttonRef}
                onMouseDown={handleButtonPress}
                onMouseUp={handleButtonRelease}
                onMouseLeave={handleButtonRelease}
                className={cn(
                    'inline-block h-9  w-full bg-gray-200 rounded-b-2 border-gray-400 border-b-4 border-l-4 flex items-end justify-center pb-2 cursor-pointer select-none active:bg-yellow-300 active:border-yellow-400 ',
                    type === 'sharp' &&
                        'bg-gray-800 h-8 relative text-stroke-weak z-10 border-gray-900 absolute w-[6vw] -translate-x-1/2 active:text-text-strong ',
                    isThisKeyPressed && 'bg-violet-500',
                    isThisKeyPressed && type === 'sharp' && 'bg-gray-900',
                )}
            >
                {type === 'natural' ? pitch : pitch + '#'}
            </button>
        </li>
    );
}
