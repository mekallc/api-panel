import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { FireService } from '@core/services/fire.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
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
    private router: Router,
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
    this.service$.subscribe((res) => console.log(res));
    this.chat$ = this.fireService.getChatByService(uid);
  }

  onDelete(id: string) {
    console.log(id);
    Swal.fire({
      title: 'Vas a cancelar este servicio?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.connService.patchData(`services/${id}`, { status: 'cancelled' }).subscribe(() => {
          Swal.fire('Cancelado!', '', 'success')
          this.router.navigate(['pages', 'services']);
        });
      }
    })
  }
}
