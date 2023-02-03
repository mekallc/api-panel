import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  @Input() title!: string;
  @Input() type!: any;
  @Input() data: any[] = [];
  @Input() options!: any;
  @Input() columns!: any;

  @Output() ready = new EventEmitter<object>();
  @Output() error = new EventEmitter<object>();
  @Output() select = new EventEmitter<object>();

  onReady(ev: any) {
    console.log(ev);
    this.ready.emit(ev);
  }

  onError(ev: any) {
    console.log(ev);
    this.error.emit(ev);
  }

  onSelect(ev: any) {
    console.log(ev);
    this.select.emit(ev);
  }


}
