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
  userSistema!: ChartInterface;

  constructor(
    private conn: ConnectService
  ) { }

  ngOnInit(): void {
    this.userSistema = {
      type: ChartType.BarChart,
      data: [
        ['Cliente', 30],
        ['LT', 10],
      ],
      options: {
        colors: ['red', 'blue'],
        legend: { position: "none" },
      }
    }
  }
}
