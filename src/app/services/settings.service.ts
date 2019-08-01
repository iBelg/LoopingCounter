import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key: string): any {
    const foundItem = localStorage.getItem(key);
    if (foundItem) {
      return JSON.parse(foundItem);
    }
    return undefined;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
