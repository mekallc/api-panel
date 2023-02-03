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

declare let google: any;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @ViewChild('acc') accordion!: NgbAccordion;
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
    private fireService: FireService,
    private gMapService: GoogleMapsService,
  ) {
    activatedRoute.params
    .pipe(map(({ uid }: Params) => uid), take(1))
    .subscribe(uid => this.setData(uid));
  }

  ngOnInit(): void {
    console.log(this.fields.length);
    this.getData();
    this.setHookFormly();
    this.getCurrentLocation();
    console.log(this.form);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  setCreate() {
    console.log('CREATE ');
  }

  setEdit(uid: string) {
    this.uid = uid;
    this.conn.getData(`banners/${uid}`).subscribe((res: any) => {
      this.image = res.picture;
      console.log(res);
      this.form.patchValue({
        url: res.url,
        name: res.name,
        file: res.picture,
        latitude: res.position.latitude,
        distance: res.position.distance,
        longitude: res.position.longitude,
        end_date: res.end_date || '',
        start_date: res.start_date || '',
        type: res.type,
      });
    })
    console.log(uid);
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

  private setData(uid?: any) {
    if (uid) this.setEdit(uid)
    else this.getVerificatedCreateUrl();
  }

  private getVerificatedCreateUrl() {
    const route = this.router.url.includes('create');
    if(!route) {
      this.router.navigate(['banners']);
    }
  }
}
