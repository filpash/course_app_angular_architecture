import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { FormFieldModule, InputModule, PasswordModule } from "@app/shared";
import { ButtonModule } from "@app/shared";
import { SpinnerModule } from "@app/shared";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class LoginModule { }
