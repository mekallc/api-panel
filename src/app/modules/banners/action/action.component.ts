import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { BannersFormlyJson, CompanyTableJson } from './../banners.data';
import { GoogleMapsService } from '@core/services/google-maps.service';
import { ConnectService } from '@core/services/connect.service';
import { FireService } from '@core/services/fire.service';
import { UtilsService } from '@core/services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @ViewChild('acc') accordion!: NgbAccordion;
  title!: string;
  marker: any;
  display: any;
  position: any;
  activeListCompanies = false;

  table: any;
  uid!: string;
  image!: string;
  items$!: Observable<any[]>
  dtOptions: DataTables.Settings = {};

  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = BannersFormlyJson;

  radius = 1000;
  mapLoaded!: Observable<boolean>;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  options: google.maps.MapOptions = { center: {lat: 40, lng: -20}, zoom: 12 };


  constructor(
    private router: Router,
    private conn: ConnectService,
    activatedRoute: ActivatedRoute,
    private uService: UtilsService,
    private fireService: FireService,
    private gMapService: GoogleMapsService,
  ) {
    activatedRoute.params
    .pipe(map(({ uid }: Params) => uid), take(1))
    .subscribe(uid => this.setData(uid));
  }

  ngOnInit(): void {
    this.getData();
    this.setHookFormly();
    this.getCurrentLocation();
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value: any = this.form.value;
    const one = `${value.starAt.day}/${value.starAt.month}/${value.starAt.year}`;
    const two = `${value.endAt.day}/${value.endAt.month}/${value.endAt.year} 23:59`;
    value.starAt = moment(one, 'DD-MM-YYYY').toDate();
    value.endAt = moment(two, 'DD-MM-YYYY HH:mm').toDate();
    value.position = {
      distance: value.distance,
      latitude: value.latitude,
      longitude: value.longitude,
    };
    if (this.uid) {
      this.save(value)
    } else {
      this.add(value);
    }
  }

  setCreate() {
    console.log('CREATE ');
  }

  setEdit(uid: string) {
    this.uid = uid;
    this.title = 'Banner: Actualizar';
    this.conn.getData(`banners/${uid}`).subscribe((res: any) => {
      this.image = res.picture;
      this.form.patchValue({
        url: res.url,
        name: res.name,
        latitude: res.position.latitude,
        distance: res.position.distance,
        longitude: res.position.longitude,
        end_date: res.end_date || '',
        start_date: res.start_date || '',
        type: res.type,
      });
    })
  }

  getData() {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.table = CompanyTableJson;
    this.items$ = this.conn.getData('companies');
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.position = position;
          this.setPositionInitial(position.coords);
          this.mapLoaded = this.gMapService.apiLoaded();
        }
      });
    }
  }

  onClick(ev: any) {
    console.log(ev._id);
    this.form.patchValue({ url: ev._id });
  }
  setOnAddress(ev: any) {
    const lat = ev.latLng.lat();
    const lng = ev.latLng.lng();
    if (lat && lng) {
      this.display = { lat, lng };
      this.marker = { lat, lng };
      this.fields[4].formControl?.setValue(lat);
      this.fields[5].formControl?.setValue(lng);
    }
  }

  setPositionInitial(position: any) {
    const value = { lat: position.latitude, lng: position.longitude };
    this.options.center = value;
    this.marker = value;
  }

  setHookFormly() {
    this.fields[6].hooks = {
      onInit: (field: any) => field.formControl.valueChanges
      .pipe( tap((value: any) => this.radius = value) )
    }
    this.fields[3].hooks = {
      onInit: (field: any) => field.formControl.valueChanges
      .pipe(tap((value: any) => {
        this.activeListCompanies = value;
      }))
    }
  }

  onBack() {
    this.router.navigate(['pages', 'banners']);
  }

  private setData(uid?: any) {
    if (uid) this.setEdit(uid)
    else this.getVerificatedCreateUrl();
  }

  private getVerificatedCreateUrl() {
    this.title = 'Banner: Crear';
    const route = this.router.url.includes('create');
    if(!route) {
      this.router.navigate(['banners']);
    }
  }

  private async add(value: any) {
    value.status = 1;
    const upload: any = await this.fireService.upload('banners', value.picture[0]);
    if(upload) {
      value.picture = upload ? upload: '';
      this.conn.postData('banners', value)
      .subscribe((res) => {
        this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
        this.router.navigate(['pages', 'banners']);
      })
    }
  }
  private async save(value: any) {
    delete value._id;
    if (value.file) {
      const upload: any = await this.fireService.upload('admin', value.picture[0]);
      if(upload) {
        value.picture = upload ? upload: '';
      }
    }
    this.conn.patchData(`banners/${this.uid}`, value)
    .subscribe(() => {
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.router.navigate(['pages', 'banners']);
    })
  }
}
