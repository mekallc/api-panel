import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { ConnectService } from '@core/services/connect.service';
import { Observable } from 'rxjs';
import { DataTableJson, Title } from './notifications.data';
import { UtilsService } from '@core/services/utils.service';
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
  title = Title;
  table: any;
  dtOptions: DataTables.Settings = {};
  count!: string;
  constructor(
    private fb: FormBuilder,
    private http: ConnectService,
    private uService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getData();
    const count = this.form.value.body.length;
    console.log(count);
  }
getData() {
  this.table = DataTableJson;
  this.dtOptions = { pagingType: 'full_numbers' };
  this.items$ = this.http.getData('notification');
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
    this.http.postData('notification', value).subscribe((res: any) => {
      this.getData();
      this.uService.setAlert({
        title: ''
      })
    })
  }

  onValidateType(ev: any) {
    const lt = this.form.value.lt;
    const cliente = this.form.value.cliente;
    this.activeToken = lt || cliente ? true : false;
  }

  onTrash(ev: any) {
    this.http.deleteData(`notification/${ev._id}`).subscribe(() => {
      this.getData();
      this.uService.setAlert({
        title: 'Se elimino la notificación',
        text: 'Este proceso es irreversible',
        icon: 'info'
      })
    })
  }

  private loadForm() {
    this.form = this.fb.group({
      cliente: [''],
      lt: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      fecha: ['', Validators.required],
    });
    console.log(this.form);
  }
}
