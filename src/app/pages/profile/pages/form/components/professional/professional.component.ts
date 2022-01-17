import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { regex, regexError } from "@app/shared";
import { markFormGropeTouched } from "@app/shared";

import { Dictionaries } from "@app/store/dictionaries";
import { RecruiterForm } from "./roles/recruiter/recruiter.component";
import { EmployeeForm } from "./roles/employee/employee.component";

import { StepperService } from "../stepper/services";

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm | EmployeeForm;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value: ProfessionalForm;
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<ProfessionalForm>();

  form: FormGroup;
  regexErrors = regexError;

  private destroy = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) { }

  ngOnInit(): void {

    this.initForm();

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if (!this.form.valid) {
        markFormGropeTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  initForm() {
    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      about: [null]
    });
  }

}
