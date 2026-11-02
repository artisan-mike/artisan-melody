import { notes } from '@/store/notes';

import { InstrumentSelector } from './IntrumentSelctor';
import { Key } from './Key';
import { Octave } from './Octave';

export function Board() {
    return (
        <section className="rounded-t-2 rounded-b-5 flex w-full flex-col bg-gray-800">
            <h1 className="text-stroke-weak rounded-3 mb-2 w-fit border-4 border-t-0 border-r-0 border-l-0 border-gray-900 pt-3 pr-5 pb-3 pl-4">
                Artisan-Melody
            </h1>

            <div className="flex justify-around">
                <Octave />
                <InstrumentSelector />
            </div>

            <div className="relative mt-6 flex">
                <div
                    aria-hidden
                    className="absolute top-0 left-0 z-10 h-1 w-full bg-gray-900"
                ></div>

                <li className="rounded-bl-5 rounded-br-1 z-10 h-9 w-1/9 border-b-8 border-gray-900 bg-gray-800"></li>

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
