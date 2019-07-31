export class SoundConfig {
  frequency = 440.0;
  oscillatorType: OscillatorType = 'sine';
  detune = 0;
  rampDownValue = 0.00001;
  rampDownTime = 0.5;
}

declare type OscillatorType = 'sine'|'square'|'sawtooth'|'triangle';
