import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SoundConfig} from '../../services/models/sound-config';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'lc-sound-panel',
  templateUrl: 'sound-panel.component.html',
  styleUrls: ['sound-panel.component.css']
})
export class SoundPanelComponent implements OnInit {
  private _configForm: FormGroup;
  private _soundConfig: SoundConfig;
  readonly oscillatorTypes = ['sine', 'square', 'sawtooth', 'triangle'];

  @Output()
  soundConfigChange: EventEmitter<SoundConfig> = new EventEmitter<SoundConfig>();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._configForm = this._fb.group({
      frequency: new FormControl(this._soundConfig.frequency),
      oscillatorType: new FormControl(this._soundConfig.oscillatorType),
      detune: new FormControl(this._soundConfig.detune),
      rampDownValue: new FormControl(this._soundConfig.rampDownValue),
      rampDownTime: new FormControl(this._soundConfig.rampDownTime)
    });
    this._configForm.valueChanges.subscribe(() => this.onFormValueChanged());
  }

  onFormValueChanged() {
    this._soundConfig = this._configForm.getRawValue();
    this.soundConfigChange.emit(this._soundConfig);
  }

  formThumbLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  get configForm(): FormGroup {
    return this._configForm;
  }

  @Input()
  set soundConfig(config: SoundConfig) {
    this._soundConfig = config;
    if (this._configForm) {
      this._configForm.patchValue(config as any);
    }
  }
}
