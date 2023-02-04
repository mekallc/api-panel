import { map, Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { UnitConvertedPipe } from '@core/pipe/unit-converted.pipe';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [UnitConvertedPipe]
})
export class ViewComponent implements OnInit {

  item$!: Observable<any>;
  constructor(
    private router: Router,
    private conn: ConnectService,
    activatedRoute: ActivatedRoute,
    private uService: UtilsService,
  ) {
    activatedRoute.params
    .pipe(map(({ uid }: any) => uid), take(1))
    .subscribe(uid => this.getData(uid));

  }

  ngOnInit(): void {
  }

  getData(uid: string) {
    console.log(uid);
    this.item$ = this.conn.getData(`banners/${uid}`);
  }

  onBack() {
    this.router.navigate(['pages', 'banners']);
  }
  getInterno(item: string) {
    if (item.includes('http')) {
      return 'Externo';
    }
    return 'Interno';
  }

  setUrl(item: string) {
    if (item.includes('http')) return true;
    return false;
  }

  onEdit(uid: string) {
    this.router.navigate(['pages', 'banners', 'edit', uid]);
  }

  onDelete(uid: string) {
    this.conn.deleteData(`banners/${uid}`).subscribe(
      () => {
        this.uService.setToast('', 'Info!', 'Se elimino correctamente el Banner');
        this.router.navigate(['pages', 'banners']);
      }
    )
  }
}
