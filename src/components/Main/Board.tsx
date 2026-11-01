import { notes } from '@/store/notes';

import { Key } from './Key';

export function Board() {
    return (
        <section className="rounded-t-2 rounded-b-5 b flex w-full flex-col bg-gray-800 text-center">
            <h1 className="text-stroke-weak mt-3 mb-5">Artisan-Melody</h1>

            <div className="relative flex">
                <div
                    aria-hidden
                    className="absolute top-0 left-0 h-2 w-full bg-gray-900"
                ></div>

                <li className="rounded-bl-5 rounded-br-1 z-10 h-9 w-1/9 border-b-8 border-gray-900 bg-gray-800"></li>

                <ul className="flex w-7/9">
                    {notes.map(({ type, pitch }) => (
                        <Key
                            key={type + pitch}
                            note={{ type, pitch }}
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
