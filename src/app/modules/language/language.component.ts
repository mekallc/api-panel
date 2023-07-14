import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguagesTableJson, Title } from './language.data';
import { ConnectService } from '@core/services/connect.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  title = Title;
  table: any;
  items$!: Observable<any[]>
  dtOptions: DataTables.Settings = {};
  constructor(
    private router: Router,
    private connService: ConnectService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.table = LanguagesTableJson;
    this.items$ = this.connService.getData('language');
    this.items$.subscribe(res => console.log('LANG', res));
  }

  onEdit(ev: any) {
    this.router.navigate(['/pages', 'languages', 'action', ev._id]);
  }
}
