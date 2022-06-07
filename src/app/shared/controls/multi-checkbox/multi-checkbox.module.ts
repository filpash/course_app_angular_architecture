import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiCheckboxComponent } from './multi-checkbox.component';



@NgModule({
  declarations: [
    MultiCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MultiCheckboxComponent
  ]
})
export class MultiCheckboxModule { }
