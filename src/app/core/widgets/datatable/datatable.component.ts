import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() status = true;
  @Input() actions: any;
  @Input() data: any;
  @Input() table!: TableDynamic;
  @Input() options: DataTables.Settings = { };

  @Output() setView = new EventEmitter<object>();
  @Output() setEdit = new EventEmitter<object>();
  @Output() setTrash = new EventEmitter<object>();

  dtOptions: DataTables.Settings = { };

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
    const value = item.split('.').pop();
    if (value === 'svg' || value === 'png' || value === 'jpg') {
      return true;
    }
    return false;
  }
}


export interface TableDynamic {
  title: string[];
  data: string[];
}
