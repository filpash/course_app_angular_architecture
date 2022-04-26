import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPhotoModule } from "@app/shared";

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';


@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    UserPhotoModule
  ]
})
export class DisplayModule { }
