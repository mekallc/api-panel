import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [DatePipe]
})
export class DatatableComponent implements OnInit {
  @Input() id = true;
  @Input() status = true;
  @Input() actions: any;
  @Input() data: any;
  @Input() table!: TableDynamic;
  @Input() options: DataTables.Settings = { };

  @Output() setView = new EventEmitter<object>();
  @Output() setEdit = new EventEmitter<object>();
  @Output() setTrash = new EventEmitter<object>();

  dtOptions: DataTables.Settings = { };

  constructor(
    private dp: DatePipe,
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.options;
    this.disableStatus();
  }

  onView(item: any) {
    this.setView.emit(item);
  }
  onEdit(item: any) {
    this.setEdit.emit(item);
  }
  onTrash(item: any) {
    this.setTrash.emit(item);
  }

  validate(search: string) {
    const value = this.actions.indexOf(search);
    if (value < 0) {
      return false;
    }
    return true;
  }
  parseData(item: any, data: string) {
    if (data.includes('.')) {
      const column = data.split('.');
      return this.setImage(item[column[0]][column[1]]);
    }
    if (data.includes('createdAt')) {
      return this.dp.transform(item[data], 'dd-MM-yyyy | HH:mm', 'es-ES');
    }
    if (data.includes('_id') && this.id) {
      return item[data].slice(0, 7);
    }
    if (typeof(item[data]) === 'object') {
      return this.setObject(item[data]);
    }
    if (typeof(item[data]) === 'undefined') {
      return '';
    }
    return this.setImage(item[data]);
  }

  setImage(item: any){
    if (item.includes('.')) {
      return this.setBooleanImage(item) ?
        `<img src="${item}" height="30px" class="mx-auto d-block" />` :
        item;
    }
    return item;
  }

  disableStatus() {
    const { title } = this.table;
    const lower = title.map((e: string) => e.toLowerCase());
    const exist = lower.includes('status');
    if (exist) {
      this.status = false;
    }
  }

  private setBooleanImage(item: string) {
    if (item.includes('jpg')) return true;
    if (item.includes('jpeg')) return true;
    if (item.includes('png')) return true;
    if (item.includes('svg')) return true;
    return false;
  }

  private setObject(data: any) {
    const html: string[] = [];
    for (const key in data) {
      const newValue = +key === 0 ? ' Cliente' : ' LT';
      html.push(newValue);
    }
    return html;
  }
}


export interface TableDynamic {
  title: string[];
  data: string[];
}
