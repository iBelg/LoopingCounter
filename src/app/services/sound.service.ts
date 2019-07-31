import {Injectable} from '@angular/core';
import {SoundConfig} from './models/sound-config';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private readonly _audioContext = new AudioContext();

  public basicSound() {
    const osc = this._audioContext.createOscillator();
    const gain = this._audioContext.createGain();
    osc.connect(gain);
    gain.connect(this._audioContext.destination);
    osc.frequency.value = 550.0;
    osc.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, this._audioContext.currentTime + 0.5);
    osc.stop(this._audioContext.currentTime + 1);
  }

  public configuredSound(config: SoundConfig) {
    if (!config) {
      config = new SoundConfig();
    }
    const osc = this._audioContext.createOscillator();
    const gain = this._audioContext.createGain();
    osc.connect(gain);
    gain.connect(this._audioContext.destination);
    osc.type = config.oscillatorType;
    osc.frequency.value = config.frequency;
    osc.detune.value = config.detune;
    osc.start(0);
    gain.gain.exponentialRampToValueAtTime(config.rampDownValue, this._audioContext.currentTime + config.rampDownTime);
    osc.stop(this._audioContext.currentTime + config.rampDownTime + 0.5);
  }

  public playMultiple(soundFn, times, delay) {
    soundFn.call(this);
    let amountPlayed = 0;
    const sub = setInterval(() => {
      amountPlayed += 1;
      soundFn.call(this);
      if (amountPlayed > (times - 2)) {
        clearInterval(sub);
      }
    }, delay);
  }
}
