import * as Tone from 'tone';

import { Instrument } from '@/store/types';

/**
 * @description create an instrument that can be played
 */
export function useInstrument(instrument?: Instrument) {
    switch (instrument) {
        case 'synth':
            return new Tone.Synth().toDestination();

        case 'metalSynth':
            return new Tone.MetalSynth().toDestination();

        default:
            return new Tone.Synth().toDestination();
    }
}
