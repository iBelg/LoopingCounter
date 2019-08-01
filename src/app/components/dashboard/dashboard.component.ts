import {Component, OnInit} from '@angular/core';
import {SoundConfig} from '../../services/models/sound-config';
import {SettingsService} from '../../services/settings.service';
import {soundConfigSaveKey} from '../../services/constants';

@Component({
  selector: 'lc-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _active = false;
  private _soundConfig: SoundConfig;

  constructor(private _settings: SettingsService) {
  }

  ngOnInit() {
    this._soundConfig = this._settings.load(soundConfigSaveKey) || new SoundConfig();
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  saveSoundConfig() {
    this._settings.save(soundConfigSaveKey, this._soundConfig);
  }

  resetSoundConfig() {
    this._soundConfig = new SoundConfig();
    this._settings.remove(soundConfigSaveKey);
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
