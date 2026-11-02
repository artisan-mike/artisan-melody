import * as Tone from 'tone';

import { Instrument } from '@/store/types';

/**
 * @description create an instrument that can be played
 */
export function useInstrument(instrument?: Instrument) {
    switch (instrument) {
        case 'Synth':
            return new Tone.Synth().toDestination();

        case 'Membrane':
            return new Tone.MembraneSynth().toDestination();

        case 'Metal-Synth':
            return new Tone.MetalSynth().toDestination();

        default:
            return new Tone.Synth().toDestination();
    }
}
