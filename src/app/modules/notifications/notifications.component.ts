import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { ConnectService } from '@core/services/connect.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  items$!: Observable<any[]>;
  activeToken: boolean = false;
  hours!: string[];
  minuts!: string[];
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: ConnectService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getData();
  }
getData() {
  this.items$ = this.http.getData('notification');
  this.items$.subscribe(res => console.log('NOT', res));
}


  onSubmit() {
    if (this.form.invalid) return;
    const value: any = this.form.value;
    value.type = [];
    const fecha = moment(value.fecha).tz('America/Santo_Domingo');
    const horaLocal = fecha.format('YYYY-MM-DD HH:mm:ss');
    const timestamp = new Date(horaLocal).getTime()
    if (value.cliente) { value.type.push(0); }
    if (value.lt) { value.type.push(1); }
    value.fecha = timestamp;
    console.log(value);
    this.http.postData('notification', value).subscribe((res: any) => {
      console.log('POST NOTIFICATION', res);
      this.getData();
    })
  }

  onValidateType(ev: any) {
    const lt = this.form.value.lt;
    const cliente = this.form.value.cliente;
    this.activeToken = lt || cliente ? true : false;
  }

  private loadForm() {
    this.form = this.fb.group({
      token: [''],
      cliente: [''],
      lt: [''],
      title: ['Titulo', Validators.required],
      body: ['Test', Validators.required],
      fecha: ['2023-06-03', Validators.required],
    });
    console.log(this.form);
  }
}
