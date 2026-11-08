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
    const { instrument: instrumentName, octave } = useSnapshot(appState);
    // this is checked on every render
    const isKeyboardKeyPressed = !!pressedKeys.find(
        (pressedKey) => pressedKey === key,
    );
    // contains the instrument that will be assigned later in the useEffect
    const instrument = useRef<ToneJsInstrument | null>(null);
    const [isThisKeyPressed, setIsThisKeyPressed] = useState(false);
    // track if a note is playing
    const isNotPlaying = useRef(false);

    async function playNote() {
        if (!instrument.current) return;
        // if a note is already playing, do nothing
        if (isNotPlaying.current) return;
        isNotPlaying.current = true;
        // start audio context
        await Tone.start();
        // play the note
        instrument.current.triggerAttack(
            `${pitch}${type === 'sharp' ? '#' : ''}${octave}`,
            Tone.now(),
        );
    }

    async function stopNote() {
        isNotPlaying.current = false;
        if (!instrument.current) return;
        await Tone.start();
        instrument.current.triggerRelease(Tone.now());
    }

    // code to run on the first render and when the instrument
    // name change
    useEffect(() => {
        // clean up the previous instrument
        if (instrument.current) instrument.current.dispose();
        // create a new intrument
        instrument.current = useInstrument(instrumentName);
    }, [instrumentName]);

    // // code to run on the first render and every time pointerIds changes
    // useEffect(() => {
    //     if (!buttonRef.current) return;
    //     const button = buttonRef.current;
    //     // stop a the when the finger leave the screen
    //     document.addEventListener('pointerup', () => {
    //         setIsThisKeyPressed(false);
    //     });

    //     document.addEventListener('pointermove', (ev) => {
    //         // if the event is not a touch do nothing
    //         if (ev.pointerType !== 'touch') return;
    //         // track the element under the touch pointer
    //         const underFinger = document.elementFromPoint(
    //             ev.clientX,
    //             ev.clientY,
    //         );
    //         // if the element under the touch pointer is not this
    //         // or not in this button, stop the note
    //         if (button.contains(underFinger) && pointerIds.size > 0) {
    //             setIsThisKeyPressed(true);
    //         }
    //     });
    // }, [pointerIds]);

    // code that runs on every rerender
    useEffect(() => {
        // play a note when a specific keyboard key is pressed in the app state
        if (isKeyboardKeyPressed || isThisKeyPressed) playNote();
        // stop note when the key and the mouse is not pressed
        else stopNote();
    });

    return (
        <li
            className={cn(
                'relative w-full overflow-visible touch-none',
                type === 'sharp' && 'w-0',
                className,
            )}
            draggable={false}
            {...rest}
        >
            <button
                ref={buttonRef}

                onPointerDown={() => {
                    setIsThisKeyPressed(true);
                }}
                onPointerUp={() => {
                    setIsThisKeyPressed(false);
                }}
                onPointerLeave={() => {
                    setIsThisKeyPressed(false);
                }}
                onPointerEnter={(ev) => {
                    if (ev.buttons === 1) setIsThisKeyPressed(true);
                }}

                draggable={false}
                className={cn(
                    'inline-block h-9  w-full bg-gray-200 rounded-b-2 border-gray-400 border-b-4 border-l-4  pb-4 justify-center cursor-pointer select-none flex items-end relative active:text-text-weak group touch-none',
                    type === 'sharp' &&
                        'bg-gray-800 h-8 relative z-10 border-gray-900 absolute w-[6vw] max-w-6 text-stroke-weak -translate-x-1/2 active:text-text-strong ',
                    (isKeyboardKeyPressed || isThisKeyPressed) &&
                        'bg-yellow-300 border-yellow-400 text-text-strong',
                )}
            >
                <span
                    className={cn(
                        'text-stroke-strong absolute -top-5 left-1/2 -translate-x-1/2 font-semibold ',
                        (isKeyboardKeyPressed || isThisKeyPressed) &&
                            'text-yellow-300',
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
