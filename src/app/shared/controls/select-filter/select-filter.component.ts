import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, forwardRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, startWith } from "rxjs/operators";
import { Value } from "@app/models/frontend";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFilterComponent),
      multi: true
    }
  ]
})
export class SelectFilterComponent implements OnInit, OnChanges {

  @Input() public appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() public multiple: boolean = false;
  @Input() public placeholder: string = "Specify placeholder";
  @Input() public items: Array<any> | Observable<Array<any>> = [];

  @Input() public bindValueKey: string = "value";
  @Input() public bindLabelKey: string = "label";
  @Input() public searchPlaceholder: string = "Search ...";
  @Output() itemFilterServerSide = new EventEmitter<string>();
  @Output() changed = new EventEmitter<Value>();

  value: Value;
  isDisabled: boolean;

  filterFormControl: FormControl = new FormControl('');
  private isServerSide: boolean = true;
  public currentStaticItems: Array<any> = [];

  constructor() { }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  writeValue(value: Value) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  private listenToFilterFormControlChanges(): void {
    this.filterFormControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
      )
      .subscribe((value: string) => {
        if (this.isServerSide) {
          this.itemFilterServerSide.emit(value);
        } else {
          this.filterStaticList(value);
        }
    });
  }

  private filterStaticList(value: string) {
    const currentItems = this.currentStaticItems;

    const filterValue = this._normalizeValue(value);
    this.items = of(
      currentItems.filter(item => this._normalizeValue(item).includes(filterValue))
    );
  }

  private _normalizeValue(value: any): string {
    if (typeof value !== "string") {
      value = value[this.bindLabelKey];
    }
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    this.listenToFilterFormControlChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
      this.items = of(this.items);
      this.isServerSide = false;
    }
  }

}
