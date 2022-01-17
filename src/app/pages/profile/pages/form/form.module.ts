import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {
  FormFieldModule,
  InputModule,
  AutocompleteModule,
  SelectModule,
  CheckboxesModule,
  RadiosModule,
  DateRangeModule
} from "@app/shared";
import { FilesUploadModule } from "@app/shared";
import { SpinnerModule } from "@app/shared";
import { UserPhotoModule } from "@app/shared";

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';

import { StepperModule } from "./components";
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';


@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    EmployeeComponent,
    RecruiterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    SelectModule,
    CheckboxesModule,
    RadiosModule,
    DateRangeModule,
    FilesUploadModule,
    UserPhotoModule,
    SpinnerModule,
  ]
})
export class FormModule { }
