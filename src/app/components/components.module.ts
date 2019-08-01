import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CounterComponent} from './counter/counter.component';
import {SoundPanelComponent} from './sound-panel/sound-panel.component';
import {SequencePanelComponent} from './sequence-panel/sequence-panel.component';

@NgModule({
  declarations: [DashboardComponent, CounterComponent, SoundPanelComponent, SequencePanelComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [DashboardComponent]
})
export class ComponentsModule {
}
