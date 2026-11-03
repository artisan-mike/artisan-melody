import { MusicNoteIcon, MusicNotesIcon } from '@phosphor-icons/react';

import { notes } from '@/store/notes';

import { InstrumentSelector } from './IntrumentSelctor';
import { Key } from './Key';
import { Octave } from './Octave';

export function Board() {
    return (
        <section className="rounded-t-2 rounded-b-5 max-w-tablette relative m-auto flex w-full flex-col bg-gray-800">
            <h1 className="text-stroke-weak rounded-3 mb-2 w-fit border-4 border-t-0 border-r-0 border-l-0 border-gray-900 pt-3 pr-5 pb-3 pl-4">
                Artisan-Melody
            </h1>

            <div
                aria-hidden
                className="text-text-weak absolute top-0 left-0 h-full w-full text-5xl"
            >
                <MusicNoteIcon
                    weight="fill"
                    className="tablette:top-3 tablette:left-[85%] absolute top-8 left-[75%] rotate-8"
                />
                <MusicNotesIcon
                    weight="fill"
                    className="desktop:left-5 tablette:left-3 tablette:bottom-4 absolute bottom-[60%] left-[80%] z-20 -rotate-12"
                />
            </div>

            <div className="tablette:flex-row tablette:pl-0 z-10 flex flex-col items-start justify-around gap-4 pl-[calc(1/9*100%)]">
                <Octave />
                <InstrumentSelector />
            </div>

            <div className="relative mt-6 flex">
                <div
                    aria-hidden
                    className="absolute top-0 left-0 z-10 h-1 w-full bg-gray-900"
                ></div>

                <div className="rounded-bl-5 rounded-br-1 z-10 h-9 w-1/9 border-b-8 border-gray-900 bg-gray-800"></div>

                <ul className="flex w-7/9">
                    {notes.map(({ type, pitch, key }) => (
                        <Key
                            key={type + pitch}
                            note={{ type, pitch, key }}
                        />
                    ))}
                </ul>

                <div
                    aria-hidden
                    className="rounded-br-5 rounded-bl-1 z-10 h-9 w-1/9 border-b-8 border-l-4 border-gray-900 bg-gray-800"
                ></div>
            </div>
        </section>
    );
}
