import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuDataJson } from '@core/widgets/header/menu.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menus: any[] = MenuDataJson;
  collapsed = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  getUrl(url: string) {
    this.router.navigateByUrl(url);
  }

}
