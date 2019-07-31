import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound.service';
import {SoundConfig} from '../../services/models/sound-config';

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
  private readonly _intervalMs = 5;
  private startPerformance;

  @Input()
  soundConfig: SoundConfig;

  constructor(private _sound: SoundService) {
  }

  start() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
    this.reset();
    this.startPerformance = performance.now();
    this._intervalId = window.setInterval(() => this.countdown(), this._intervalMs);
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
    this._sound.playMultiple(() => this._sound.configuredSound(this.soundConfig), 2, 120);
  }

  get displayTime() {
    return Math.round(this._milliseconds - this._elapsedMs) || 0;
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
