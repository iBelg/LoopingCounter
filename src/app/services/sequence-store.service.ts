import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {SequenceItem} from './models/sequence-item';

@Injectable({
  providedIn: 'root'
})
export class SequenceStoreService extends Dexie {
  sequences: Dexie.Table<SequenceItem, number>;

  constructor() {
    super('lcSequenceStore');
    this.version(1).stores({
      sequences: '++id, text, order, image'
    });
  }

  add = async (item: SequenceItem) => await this.sequences.add(item);
  remove = async (itemId: number) => await this.sequences.where('id').equals(itemId).delete();

}
