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
  userCountry!: any;
  totalPlataforma!: number;
  totalServices!: number;
  countries = [
    {
        "_id": "64792b3e1b4d0500078045e1",
        "name": "Brazil",
        "iso2": "BR"
    },

    {
        "_id": "64792b3e1b4d0500078045e3",
        "name": "Colombia",
        "iso2": "CO"
    },

    {
        "_id": "64792b3e1b4d0500078045e5",
        "name": "Dominican Republic",
        "iso2": "DO"
    },

    {
        "_id": "64792b3e1b4d0500078045e9",
        "name": "Mexico",
        "iso2": "MX"
    }
  ];

  constructor(
    private conn: ConnectService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getServices();
  }

  getUsers() {
    this.conn.getData('users').subscribe((res: any) => {
      this.getUserWithCountries(res);
      const cliente: number = res.filter((row: any) => row.type_user === 0).length;
      const lt: number = res.filter((row: any) => row.type_user === 1).length;
      this.totalPlataforma = lt + cliente;
      this.userSistema = {
        type: ChartType.PieChart,
        title: 'Usuários Registrados',
        data: [
          ["Meka Cliente", cliente],
          ["Meka LT", lt]
        ],
        options: {
          colors: [ '#FFD30D', '#4C4C4C'],
          chartArea: { width: '90%' },
          legend: { position: "top" },
          pieHole: 0.4
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
          colors: ['#269762'],
          chartArea: { width: '90%' },
          title: 'Total Servicios',
          legend: { position: "none" },
        },
      }
    })
  }

  private getUserWithCountries(data: any) {
    console.log(data);
    if (data) {
      const RD = this.setCountry('64792b3e1b4d0500078045e5', data);
      const MX = this.setCountry('64792b3e1b4d0500078045e9', data);
      const CO = this.setCountry('64792b3e1b4d0500078045e3', data);
      const BR = this.setCountry('64792b3e1b4d0500078045e1', data);
      console.log(RD);
      console.log(MX);
      console.log(CO);
      console.log(BR);
      this.userCountry = {
        type: ChartType.ColumnChart,
        title: 'Usuários por Paises',
        chartColumns: ['Total', 'Cliente', 'LT'],
        data: [
          ["RD", RD[0], RD[1], RD[2]],
          ["CO", CO[0], CO[1], CO[2]],
          ["MX", MX[0], MX[1], MX[2]],
          // ["BR", BR[0], BR[1], BR[2]],
        ],
        options: {
          colors: ['#145290', '#FFD30D', '#4C4C4C'],
          is3D: true,
          legend: { position: "top" },
          chartArea: { width: '90%' },
        },
      }
    }
  }

  private setCountry(country: string, data: any) {
    const RD: any = data.filter((row: any) => row.country._id === country);
    const RD0 = RD.filter((row: any) => row.type_user === 0).length;
    const RD1 = RD.filter((row: any) => row.type_user === 1).length;
    return [RD.length, RD0, RD1];
  }
}
