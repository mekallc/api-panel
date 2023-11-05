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
  table:any = [];
  dtOptions: DataTables.Settings = {};
  users!: any[];
  constructor(
    private conn: ConnectService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getServices();
  }

  getUsers() {
    this.conn.getData('users').subscribe((res: any) => {
      // this.getUserWithCountries(res);
      this.getAllCountries(res);
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

  private getAllCountries(data: any) {
    let newData: any = [];
    let newTable: any = [];
    this.conn.getData('tables/countries').subscribe((res: any) => {
      if (res) {
        res.forEach((el: any) => {
          const value = this.setCountry2(el.iso2, el._id, data);
          const newItem = {
            name: el.name,
            total: value[1],
            lt: value[3],
            cliente: value[2],
            porcCliente: this.porc(value)
          }
          newData.push(value);
          newTable.push(newItem);
        });
        this.userCountry = {
          type: ChartType.ColumnChart,
          title: 'Usuários por Paises',
          chartColumns: ['Total', 'Cliente', 'LT'],
          data: newData,
          options: {
            colors: ['#145290', '#FFD30D', '#4C4C4C'],
            is3D: true,
            legend: { position: "top" },
            chartArea: { width: '90%' },
          },
        };
        this.getTable(newTable);
      }
    })
  }

  porc(value: any[]) {
    return `${((value[1] / this.totalPlataforma) * 100).toFixed(0)}%`
  }

  getTable(data: any) {
    console.log(data);
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = {
      title: ['PAÍS', 'TOTAL', 'M. CLIENTE', 'M. LT', '% PAIS'],
      data: ['name', 'total', 'cliente', 'lt', 'porcCliente']
    }
    this.users = data;
  }

  private setCountry(country: string, data: any) {
    const RD: any = data.filter((row: any) => row.country._id === country);
    const RD0 = RD.filter((row: any) => row.type_user === 0).length;
    const RD1 = RD.filter((row: any) => row.type_user === 1).length;
    return [RD.length, RD0, RD1];
  }

  private setCountry2(name: string, country: string, data: any) {
    const RD: any = data.filter((row: any) => row.country._id === country);
    const RD0 = RD.filter((row: any) => row.type_user === 0).length;
    const RD1 = RD.filter((row: any) => row.type_user === 1).length;
    return [name, RD.length, RD0, RD1];
  }
}
