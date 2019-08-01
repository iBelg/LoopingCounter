import {Injectable} from '@angular/core';
import {SoundConfig} from './models/sound-config';
import {
  frequencyMaximumValue,
  frequencyMinimumValue,
  rampDownTimeMaximum,
  rampDownTimeMinimum,
  rampDownValueMaximum,
  rampDownValueMinimum
} from './constants';

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

    if (config.frequency < frequencyMinimumValue) {
      osc.frequency.value = frequencyMinimumValue;
    } else if (config.frequency > frequencyMaximumValue) {
      osc.frequency.value = frequencyMaximumValue;
    } else {
      osc.frequency.value = config.frequency;
    }

    osc.detune.value = config.detune;
    osc.start(0);

    let rampDownValue = config.rampDownValue;
    if (rampDownValue > rampDownValueMaximum) {
      rampDownValue = rampDownValueMaximum;
    } else if (rampDownValue < rampDownValueMinimum) {
      rampDownValue = rampDownValueMinimum;
    }

    let rampDownTime = config.rampDownTime;
    if (rampDownTime > rampDownTimeMaximum) {
      rampDownTime = rampDownTimeMaximum;
    } else if (rampDownTime < rampDownTimeMinimum) {
      rampDownTime = rampDownTimeMinimum;
    }

    gain.gain.exponentialRampToValueAtTime(rampDownValue, this._audioContext.currentTime + rampDownTime);
    osc.stop(this._audioContext.currentTime + rampDownTime + 0.5);
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
