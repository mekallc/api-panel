import { Component, OnInit } from '@angular/core';
import { ChartInterface, UserSistema } from '@core/pages/home/dash.data';
import { ConnectService } from '@core/services/connect.service';
import { ChartType } from 'angular-google-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  service!: any;
  userSistema!: ChartInterface;
  totalPlataforma!: number;
  totalServices!: number;
  constructor(
    private conn: ConnectService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getServices();
  }

  getUsers() {
    this.conn.getData('users').subscribe((res: any) => {
      const cliente: number = res.filter((row: any) => row.type_user === 0).length;
      const lt: number = res.filter((row: any) => row.type_user === 1).length;
      this.totalPlataforma = lt + cliente;
      this.userSistema = {
        type: ChartType.ColumnChart,
        title: 'Usuários Registrados',
        data: [
          ["Meka Cliente", cliente],
          ["Meka LT", lt]
        ],
        options: {
          colors: ['blue'],
          legend: { position: "none" },
        },
      }
    })
  }

  getServices() {
    this.conn.getData('services').subscribe((res: any) => {
      this.totalServices = res.length;
      const process: number = res.filter((row: any) => row.status === 'in_process').length;
      const accepted: number = res.filter((row: any) => row.status === 'accepted').length;
      const closed: number = res.filter((row: any) => row.status === 'closed').length;
      const cancelled: number = res.filter((row: any) => row.status === 'cancelled').length;
      const open: number = res.filter((row: any) => row.status === 'open').length;
      this.service = {
        columnNames: ['Servicio', 'Cantidad', { role: 'style' }],
        type: ChartType.ColumnChart,
        data: [
          ['En Proceso', process ],
          ['Finalizados', closed ],
          ['Cancelados', cancelled ],
          ['Aceptados', accepted ],
          ['Abiertos', open],
        ],
        options: {
          colors: ['grey'],
          title: 'Total Servicios',
          legend: { position: "none" },
        },
      }
    })
  }
}
