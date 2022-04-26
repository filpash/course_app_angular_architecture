import * as HEADERS from './constants/table-header';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { regex, regexError, markFormGropeTouched } from "@app/shared/utils";
import { ControlItem, TableDataHeader } from "@app/models/frontend";
import { NotificationService } from "@app/services";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form: FormGroup;
  isInline: boolean;
  regexError = regexError;
  sharedColNameProps: TableDataHeader[] = HEADERS.requestsColNameProps;

  items: ControlItem[];
  sharedInfoData: {}[];

  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.isInline = true;

    this.items = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
      { label: 'Fourth', value: 4 },
      { label: 'Fifth', value: 5 }
    ];

    this.sharedInfoData = [
      { id: '2', name: 'Nick', surname: 'Rock', age: 24, department: 'California' },
      { id: '7', name: 'Mila', surname: 'Mils', age: 28, department: 'New York' },
      { id: '9', name: 'Andrey', surname: 'Mo', age: 32, department: 'Los Angeles' },
      { id: '18', name: 'Max', surname: 'Roy', age: 36, department: 'Washington' }
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.numbers)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required
        ]
      }],
      autocomplete: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      select: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      checkboxes: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      radios: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      date: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      dateRange: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
    });
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 123,
      password: 'qwerty',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2021, 5, 10).getTime(),
        to: new Date(2021, 6, 10).getTime()
      }
    });
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

  onSubmit(): void {
    console.log('Submit');

    if (!this.form.valid) {
      markFormGropeTouched(this.form);
    }
  }

  onToggleDisable(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onToggleSpinner(): boolean {
    return this.showSpinner = !this.showSpinner;
  }

  onError(): void {
    this.notification.error('Oops! Something is wrong.');
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }

  onFilesChanged(urls: string | string[]): void {
    console.log('urls = ', urls);
  }

  linkEvent(data: any): void {
    console.log(data.department);
  }
}
