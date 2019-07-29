import {Injectable} from '@angular/core';

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
    osc.frequency.value = 440.0;
    osc.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, this._audioContext.currentTime + 0.5);
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
