import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnitConvertedPipe } from '@core/pipe/unit-converted.pipe';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [DatePipe, UnitConvertedPipe]
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
  @Output() setClick = new EventEmitter<object>();
  @Output() setTrash = new EventEmitter<object>();

  dtOptions: DataTables.Settings = { };

  constructor(
    private dp: DatePipe,
    private router: Router,
    private up: UnitConvertedPipe,
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
  onClick(item: any) {
    this.setClick.emit(item);
  }

  disableStatus() {
    const { title } = this.table;
    const lower = title.map((e: string) => e.toLowerCase());
    const exist = lower.includes('status');
    if (exist) {
      this.status = false;
    }
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
      return this.dataWithArray(item, data);
    }
    return this.dataWitOutArray(item, data);
  }

  private dataWitOutArray(item: any, data: string) {
    if (this.existImage(data)) {
      return this.setImage(item[data]);
    }
    else if (typeof(item[data]) === 'object') {
      return this.setObject(item[data]);
    }
    else if (this.existDate(data)) {
      return this.setDate(item[data]);
    }
    else if (data.includes('distance')) {
      return this.setDistance(item[data])
    }
    else if(data.includes('_id')) {
      return this.setSlice(item[data], 7);
    }
    return this.setUndefined(item[data]);
  }

  private dataWithArray(item: any, data: string) {
    const column = data.split('.');
    const newData = item[column[0]][column[1]];
    if (this.existImage(data)) {
      return this.setImage(item[data]);
    }
    else if (typeof(item[data]) === 'object') {
      return this.setObject(item[data]);
    }
    else if (data.includes('distance')) {
      return this.setDistance(newData)
    }
    else if (this.existDate(data)) {
      return this.setDate(newData)
    }
    else if(data.includes('_id')) {
      return this.setSlice(newData, 7);
    }
    return this.setUndefined(newData);
  }

  private setSlice(item: string, position: number) {
    return item.slice(0, position);
  }
  private setUndefined(item: string) {
    return (typeof(item) === 'undefined') ? '': item;
  }

  private setImage(item: string){
    return `<img src="${item}" height="30px" class="mx-auto d-block" />`;
  }

  private setDate(item: string){
    return this.dp.transform(item, 'dd-MM-yyyy | HH:mm', 'es-ES');
  }

  private setDistance(item: number) {
    return this.up.transform(item);
  }

  private existImage(item: string) {
    if (item.includes('icon')) return true;
    if (item.includes('picture')) return true;
    if (item.includes('image')) return true;
    return false;
  }

  private existDate(item: string) {
    if (item.includes('createdAt')) return true;
    if (item.includes('updatedAt')) return true;
    if (item.includes('start')) return true;
    if (item.includes('end')) return true;
    if (item.includes('startAt')) return true;
    if (item.includes('starAt')) return true;
    if (item.includes('endAt')) return true;
    return false;
  }

  private setObject(data: any) {
    const url = this.router.url.split('/').pop();
    const newA = url === 'brands' ? 'Carro' : 'Cliente';
    const newB = url === 'brands' ? ' Motocicleta' : ' LT';
    const html: string[] = [];
    for (const key in data) {
      const newValue = +key === 0 ? newA : newB;
      html.push(newValue);
    }
    return html;
  }
}


export interface TableDynamic {
  title: string[];
  data: string[];
}
