import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { FireService } from '@core/services/fire.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-view',
  imports: [NgbNavModule, CommonModule, MomentModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  service$!: Observable<any>;
  chat$!: Observable<any[]>;

  constructor(
    private fireService: FireService,
    private connService: ConnectService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({uid}) => this.getData(uid));
  }

  getData(uid: string) {
    this.service$ = this.connService.getData(`services/${uid}`);
    this.chat$ = this.fireService.getChatByService(uid);
  }
}
