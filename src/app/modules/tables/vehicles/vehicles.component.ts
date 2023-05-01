import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConnectService } from '@core/services/connect.service';
import { UtilsService } from '@core/services/utils.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title, VehiclesFormlyJson, VehiclesTableJson } from './vehicles.data';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  table: any;
  model = {};
  id!: string;
  title = Title;
  brand: any = [];
  form = new FormGroup({});
  models$!: Observable<any[]>;
  fields: any[] = VehiclesFormlyJson;
  dtOptions: DataTables.Settings = {};

  constructor(
    private ms: ConnectService,
    private uService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pageLength: 15,
      pagingType: 'full_numbers',
    }
    this.table = VehiclesTableJson;
    this.models$ = this.ms.getData('tables/vehicles');
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.save(this.form.value);
      } else {
        this.add(this.form.value);
      }
    }
  }

  onView(ev: any) {
    console.log(ev);
  }

  onEdit(ev: any) {
    this.id = ev._id;
    this.form.patchValue({ name: ev.name });
  }

  onTrash(ev: any) {
    this.getCountBrandByVehicle(ev._id).subscribe(
      (count: number) => {
        if (count < 1) {
          this.removeData(ev);
        } else {
          this.alertRemove(ev.name, count);
        }
      }
    );
  }

  private add(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand
    }
    this.ms.postData('tables/vehicles', data)
    .subscribe(() => {
      this.form.reset();
      this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/vehicles');
    })

  }
  private save(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand,
    }
    this.ms.patchData(`tables/vehicles/${this.id}`, data)
    .subscribe(() => {
      this.form.reset();
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/vehicles');
    })
  }

  private getCountBrandByVehicle(id: string) {
    return this.ms.getData(`tables/brands/type/${id}`).pipe(map((res: any) => res.length));
  }

  private removeData(ev: any) {
    this.ms.deleteData(`tables/vehicles/${ev._id}`).subscribe(() => {
      this.uService.setToast('success',
        `${ev.brand_name} ${ev.name} se elimino correctamente!`,
        'Exito!'
      );
      this.models$ = this.ms.getData('tables/vehicles');
    });
  }

  private alertRemove(name: string, count: number) {
    this.uService.setAlert({
      icon: 'error',
      title: 'Oops...',
      html: `El tipo de vehiculo <b>${name}</b> tiene <b>${count}</b> marcas ya registrada.`,
      footer: 'Para eliminar este registo debe eliminar todas las marcas asociadas.'
    });
  }
}
