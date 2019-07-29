import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound.service';

@Component({
  selector: 'lc-counter',
  templateUrl: 'counter.component.html',
  styleUrls: ['counter.component.css']
})
export class CounterComponent {
  private _milliseconds = 1000;
  private _elapsedMs: number;
  private _active: boolean;
  private _intervalId: number;
  private readonly _intervalMs = 1;
  private startPerformance;

  playSoundTimes = 2;
  playSoundDelay = 120;

  constructor(private _sound: SoundService) {
  }

  start() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
    this.reset();
    this.startPerformance = performance.now();
    this._intervalId = setInterval(() => this.countdown(), this._intervalMs);
  }

  stop() {
    clearInterval(this._intervalId);
    this.reset();
  }

  reset() {
    this._elapsedMs = 0;
  }

  countdown() {
    this._elapsedMs = performance.now() - this.startPerformance;
    if (this._elapsedMs >= this._milliseconds) {
      this.countdownReached();
      this.startPerformance = performance.now();
    }
  }

  countdownReached() {
    this._sound.playMultiple(this._sound.basicSound, this.playSoundTimes, this.playSoundDelay);
  }

  get displayTime() {
    return (this._milliseconds - this._elapsedMs) || 0;
  }

  get progressBarPercentage() {
    return (this.displayTime / this._milliseconds) * 100;
  }

  get milliseconds() {
    return this._milliseconds;
  }

  set milliseconds(ms: number) {
    this._milliseconds = ms;
  }

  get isActive(): boolean {
    return this._active;
  }

  @Input('active')
  set isActive(bool: boolean) {
    this._active = bool;
    bool ? this.start() : this.stop();
  }
}
