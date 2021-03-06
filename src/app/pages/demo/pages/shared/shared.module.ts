import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ButtonModule, ControlsModule, IndicatorsModule, PopupsModule, TableModule } from '@app/shared';


@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    IndicatorsModule,
    ControlsModule,
    PopupsModule,
    TableModule
  ]
})
export class SharedModule { }
