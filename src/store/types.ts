import type { MetalSynth, Synth } from 'tone';

export interface Note {
    type: 'natural' | 'sharp';
    pitch: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    key: string;
}

export type ToneJsInstrument = Synth | MetalSynth;

export type Instrument = 'Synth' | 'Membrane' | 'Metal-Synth';

export interface AppSate {
    instrument: Instrument;
    pressedKeys: string[];
    octave: number;
}
