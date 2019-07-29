import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule} from '@angular/material';

const __usedMaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule
];

@NgModule({
  imports: [...__usedMaterialModules],
  exports: [...__usedMaterialModules]
})
export class MaterialModule {
}
