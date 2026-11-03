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
    const { octave } = useSnapshot(appState);

    // this is checked on every render
    const isThisKeyPressed = !!pressedKeys.find(
        (pressedKey) => pressedKey === key,
    );

    // contains the instrument that will be assigned later in the useEffect
    const instrument = useRef<ToneJsInstrument | null>(null);

    // create an instrument on the first render and when
    // the instrument name state change
    useEffect(() => {
        // clean up the previous instrument
        if (instrument.current) instrument.current.dispose();
        // create a new intrument
        instrument.current = useInstrument(instrumentName);
    }, [instrumentName]);

    async function playNote() {
        if (!instrument.current) return;
        await Tone.start();
        instrument.current.triggerAttack(
            `${pitch}${type === 'sharp' ? '#' : ''}${octave}`,
            Tone.now(),
        );
    }

    async function stopNote() {
        if (!instrument.current) return;
        await Tone.start();
        instrument.current.triggerRelease(Tone.now());
    }

    // play a note when a specific keyboard key is pressed in the app state
    useEffect(() => {
        if (isThisKeyPressed) {
            playNote();
        } else {
            stopNote();
        }
    });

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
                onMouseDown={playNote}
                onMouseUp={stopNote}
                onMouseLeave={stopNote}
                onTouchStartCapture={playNote}
                onTouchEndCapture={stopNote}
                onTouchCancel={stopNote}

                className={cn(
                    'inline-block h-9  w-full bg-gray-200 rounded-b-2 border-gray-400 border-b-4 border-l-4  pb-4 justify-center cursor-pointer select-none flex items-end active:bg-yellow-300 active:border-yellow-400 relative active:text-text-weak group ',
                    type === 'sharp' &&
                        'bg-gray-800 h-8 relative z-10 border-gray-900 absolute w-[6vw] max-w-6 text-stroke-weak -translate-x-1/2 active:text-text-strong ',
                    isThisKeyPressed && 'bg-yellow-300 border-yellow-400',
                    isThisKeyPressed && type === 'sharp' && 'text-text-strong',
                )}
            >
                <span
                    className={cn(
                        'text-stroke-strong absolute -top-5 left-1/2 -translate-x-1/2 font-semibold group-active:text-yellow-300',
                        isThisKeyPressed && 'text-yellow-300',
                    )}
                >
                    {type === 'natural' ? pitch : pitch + '#'}
                </span>
                <span className="font-semibold">
                    {type === 'natural'
                        ? key.replace('Key', '')
                        : key.replace('Digit', '')}
                </span>
            </button>
        </li>
    );
}
