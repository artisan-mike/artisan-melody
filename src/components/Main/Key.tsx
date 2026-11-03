'use client';

import { cn } from 'cn';
import { useEffect, useRef, useState } from 'react';
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
    const {
        instrument: instrumentName,
        octave,
        isMousePressed,
    } = useSnapshot(appState);
    // this is checked on every render
    const isKeyboardKeyPressed = !!pressedKeys.find(
        (pressedKey) => pressedKey === key,
    );
    // contains the instrument that will be assigned later in the useEffect
    const instrument = useRef<ToneJsInstrument | null>(null);
    const [isThisKeyPressed, setIsThisKeyPressed] = useState(false);

    async function playNote() {
        if (!instrument.current) return;
        // start audio context
        await Tone.start();
        // play the note
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

    // create an instrument on the first render and when
    // the instrument name state change
    useEffect(() => {
        // clean up the previous instrument
        if (instrument.current) {
            instrument.current.dispose();
        }

        // create a new intrument
        instrument.current = useInstrument(instrumentName);
    }, [instrumentName]);

    useEffect(() => {
        // play a note when a specific keyboard key is pressed in the app state
        if (isKeyboardKeyPressed) {
            playNote();
        }
        // stop note when the key and the mouse is not pressed
        else if (!isKeyboardKeyPressed && !isMousePressed) {
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
            draggable={false}
            {...rest}
        >
            <button
                ref={buttonRef}

                onMouseDown={playNote}
                onMouseLeave={stopNote}
                onMouseEnter={() => {
                    if (isMousePressed) {
                        playNote();
                    }
                }}

                onTouchStart={async () => {
                    await playNote();
                    setIsThisKeyPressed(true);
                }}
                onTouchEnd={async () => {
                    await stopNote();
                    setIsThisKeyPressed(false);
                }}

                draggable={false}
                className={cn(
                    'inline-block h-9  w-full bg-gray-200 rounded-b-2 border-gray-400 border-b-4 border-l-4  pb-4 justify-center cursor-pointer select-none flex items-end relative active:text-text-weak group',
                    type === 'sharp' &&
                        'bg-gray-800 h-8 relative z-10 border-gray-900 absolute w-[6vw] max-w-6 text-stroke-weak -translate-x-1/2 active:text-text-strong ',
                    (isKeyboardKeyPressed || isThisKeyPressed) &&
                        'bg-yellow-300 border-yellow-400 text-text-strong',
                    isMousePressed &&
                        'hover:bg-yellow-300 hover:border-yellow-400 hover:text-text-strong',
                )}
            >
                <span
                    className={cn(
                        'text-stroke-strong absolute -top-5 left-1/2 -translate-x-1/2 font-semibold ',
                        (isKeyboardKeyPressed || isThisKeyPressed) &&
                            'text-yellow-300',
                        isMousePressed && 'group-hover:text-yellow-300',
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
