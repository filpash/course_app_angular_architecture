import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {
  FormFieldModule,
  InputModule,
  AutocompleteModule
} from "@app/shared";
import { FilesUploadModule } from "@app/shared";
import { SpinnerModule } from "@app/shared";
import { UserPhotoModule } from "@app/shared";

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';

import { StepperModule } from "./components";
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';


@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    FilesUploadModule,
    UserPhotoModule,
    SpinnerModule,
  ]
})
export class FormModule { }
