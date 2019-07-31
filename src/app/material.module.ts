import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressBarModule, MatSelectModule, MatSliderModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatSliderModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class MaterialModule {
}
