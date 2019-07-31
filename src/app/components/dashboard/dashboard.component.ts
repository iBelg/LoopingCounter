import {Component} from '@angular/core';
import {SoundConfig} from '../../services/models/sound-config';

@Component({
  selector: 'lc-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {
  private _active = false;
  private _soundConfig: SoundConfig;

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  get soundConfig(): SoundConfig {
    return this._soundConfig;
  }

  set soundConfig(config: SoundConfig) {
    this._soundConfig = config;
  }

  get active() {
    return this._active;
  }

  set active(bool: boolean) {
    this._active = bool;
  }
}
