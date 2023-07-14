import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { UtilsService } from '@core/services/utils.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  content!: any;
  uid!: string;
  lang: any;
  options = {
    lineNumbers: true,
    theme: 'material',
    mode: { name: "javascript", json: true },
  };
  constructor(
    private router: Router,
    private conn: ConnectService,
    private uService: UtilsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(map(({ uid }: Params) => uid), take(1))
    .subscribe(uid => this.getData(uid));
  }

  getData(uid: any) {
    this.uid = uid;
    console.log(uid);
    this.conn.getData(`language/${uid}`).subscribe((res: any) => {
      console.log(res);
      this.content = JSON.stringify(res.data, null, 2);
      this.lang = res;
    })
  }

  onBack() {
    this.router.navigate(['/pages', 'languages']);
  }

  onSave() {
    const data = {
      name: this.lang.name,
      type: this.lang.type,
      data: JSON.parse(this.content)
    }
    this.conn.patchData(`language/${this.uid}`, data).subscribe((res: any) => {
      this.content = JSON.stringify(res.data, null, 2);
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');

    })
  }
}
