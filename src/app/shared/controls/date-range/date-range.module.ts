import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { DateRangeComponent } from './date-range.component';
import { DateModule } from "@app/shared/controls/date/date.module";



@NgModule({
  declarations: [DateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateModule
  ],
  exports: [
    DateRangeComponent
  ]
})
export class DateRangeModule { }
