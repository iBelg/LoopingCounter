import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SequenceItem} from '../../services/models/sequence-item';

@Component({
  selector: 'lc-sequence-panel',
  templateUrl: 'sequence-panel.component.html',
  styleUrls: ['sequence-panel.component.css']
})
export class SequencePanelComponent {
  private _active: boolean;
  private _sequence: SequenceItem[];
  @Output('sequenceChange')
  private _sequenceChange: EventEmitter<SequenceItem[]> = new EventEmitter<SequenceItem[]>();
  private _currentSequenceItemIndex = undefined;

  next() {
    let nextIndex = this._currentSequenceItemIndex + 1;
    if (nextIndex >= this._sequence.length) {
      nextIndex = 0;
    }
    this._currentSequenceItemIndex = nextIndex;
  }

  reset() {
    this._currentSequenceItemIndex = 0;
  }

  add() {
    if (!this.sequence) {
      this.sequence = [];
    }
    this.sequence.push(new SequenceItem());
  }

  set active(bool: boolean) {
    this._active = bool;
  }

  @Input()
  set sequence(sequence: SequenceItem[]) {
    this._sequence = sequence;
  }

  get sequence(): SequenceItem[] {
    return this._sequence;
  }
}
