import { cn } from 'cn';

import { Note } from '@/store/types';

interface KeyProps extends React.ComponentProps<'li'> {
    note: Note;
}

export function Key({ note: { pitch, type }, className, ...rest }: KeyProps) {
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
                className={cn(
                    'inline-block h-9  w-full bg-gray-200 rounded-b-2 border-gray-400 border-b-4 border-l-4 flex items-end justify-center pb-2 cursor-pointer select-none active:bg-gray-300 ',
                    type === 'sharp' &&
                        'bg-gray-800 h-8 relative text-stroke-weak z-10 border-gray-900 absolute w-[6vw] -translate-x-1/2 active:bg-gray-900',
                )}
            >
                {type === 'natural' ? pitch : pitch + '#'}
            </button>
        </li>
    );
}
