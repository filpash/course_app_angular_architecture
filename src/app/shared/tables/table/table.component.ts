import {
  Component, EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'mat-app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input("data") dataSource = [];
  @Input("cols") tableCols = [];
  @Input() isVerticalScroll: boolean = false;

  @Output("onAction") emitter = new EventEmitter();
  @Output() buttonEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output() linkEvent: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  // We will need this getter to extract keys from tableCols
  get keys() {
    return this.tableCols.map(({ key }) => key);
  }

  buttonClick(row: T) {
    this.buttonEvent.emit(row);
  }

  linkClick(row: T) {
    this.linkEvent.emit(row);
  }

}
