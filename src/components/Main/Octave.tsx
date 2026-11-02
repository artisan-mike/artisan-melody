import {
    ArrowFatLinesLeftIcon,
    ArrowFatLinesRightIcon,
} from '@phosphor-icons/react';
import { useSnapshot } from 'valtio';

import { appState } from '@/store/appState';

import { Button } from '../sharables/Button';

interface OctaveProps extends React.ComponentProps<'div'> {}

export function Octave({ ...rest }: OctaveProps) {
    const { octave } = useSnapshot(appState);

    function handleButtonLeftClick() {
        if (octave < 2) return;
        appState.octave = appState.octave - 1;
    }

    function handleButtonRightClick() {
        if (octave > 6) return;
        appState.octave = appState.octave + 1;
    }

    return (
        <div
            className="text-stroke-weak flex flex-col items-center justify-center font-semibold"
            {...rest}
        >
            <p className="mb-3">OCTAVE</p>
            <div className="flex gap-3">
                <Button onClick={handleButtonLeftClick}>
                    <ArrowFatLinesLeftIcon
                        weight="fill"
                        className="text-xl"
                    />
                </Button>
                <p className="text-text-strong flex w-6 items-center justify-center rounded-sm border-2 border-b-0 border-l-0 border-t-gray-900 border-r-gray-900 bg-gray-300 text-3xl outline-2 outline-gray-900">
                    {octave}
                </p>
                <Button onClick={handleButtonRightClick}>
                    <ArrowFatLinesRightIcon
                        weight="fill"
                        className="text-xl"
                    />
                </Button>
            </div>
        </div>
    );
}
