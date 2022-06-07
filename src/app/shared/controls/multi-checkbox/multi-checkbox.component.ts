import { Component, forwardRef, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiCheckboxComponent),
      multi: true
    }
  ]
})
export class MultiCheckboxComponent implements OnInit, ControlValueAccessor  {
  fc: FormControl = new FormControl();

  get checked() {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
    this.render();
    this.onChangeCallback(this._checked);
  }

  @Input() isChecked: boolean = false;
  @Input() isBgGray: boolean = false;
  @Input() isThreeState: boolean;

  @Output() checkChanged = new EventEmitter<boolean>();

  @ViewChild('checkbox', { static: true }) private _checkbox: ElementRef;

  public isDisabled: boolean;

  private _checked: boolean = null;

  constructor() { }

  ngOnInit() {
    this.fc.setValue(this.isChecked);

    this.fc.valueChanges.subscribe(val => {
      this.onChangeCallback(val);
      this.checkChanged.emit(val);
    });
  }

  onChangeCallback: (val: boolean) => void = () => {};

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(val: boolean): void {
    if (val !== undefined) {
      this.checked = val;
    }
    this.fc.setValue(val, { emitEvent: false });
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChange(): void {
    this.onTouchedCallback();
  }

  public setState(): void {
    if (this._checkbox.nativeElement.readOnly) {
      this.checked = false;
    } else if (this._checkbox.nativeElement.checked) {
      this.checked = true;
    } else {
      if (this.isThreeState === true) {
        this.checked = null;
      } else {
        this.checked = false;
      }
    }
  }

  private onTouchedCallback = () => {};

  private render(): void {
    switch (this.checked) {
      // if checked
      case true:
        this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = false;
        this._checkbox.nativeElement.checked = true;
        break;
      // if empty
      case false:
        this._checkbox.nativeElement.checked =
        this._checkbox.nativeElement.readOnly =
        this._checkbox.nativeElement.indeterminate = false;
        if (this.isBgGray) {
          this._checkbox.nativeElement.classList.remove('bg-gray');
        } else {
          this._checkbox.nativeElement.classList.remove('bg-blue');
        }
        break;
      // if the box
      case null:
        this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = true;
        if (this.isBgGray) {
          this._checkbox.nativeElement.classList.add('bg-gray');
        } else {
          this._checkbox.nativeElement.classList.add('bg-blue');
        }
        break;
      case undefined:
      default:
        this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = false;
        break;
    }
  }

}
