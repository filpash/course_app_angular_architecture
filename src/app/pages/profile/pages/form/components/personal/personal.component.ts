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

import { StepperService } from "../stepper/services";

export interface PersonalForm {
  name: string;
  photoURL: string;
  country: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {

  @Input() value: PersonalForm;
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<PersonalForm>();

  form: FormGroup;
  regexError = regexError;

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

  initForm(): void {
    this.form = this.fb.group({
      photoURL: [null],
      name: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.latinAndSpaces)
        ]
      }],
      country: [null, {
        updateOn: 'change',
        validators: [Validators.required]
      }]
    });
  }

  onPhotoChanged(url: string): void {
    if (url) {
      this.form.controls.photoURL.setValue(url);
    }
  }
}
