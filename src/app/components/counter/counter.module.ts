import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CounterComponent} from './counter.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CounterComponent],
  exports: [CounterComponent],
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class CounterModule {
}
