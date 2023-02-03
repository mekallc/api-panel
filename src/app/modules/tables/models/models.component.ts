import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConnectService } from '@core/services/connect.service';
import { UtilsService } from '@core/services/utils.service';
import { ModelsFormlyJson, ModelsTableJson, Title } from '@module/tables/models/models.data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  table: any;
  model = {};
  form = new FormGroup({});
  fields: any[] = ModelsFormlyJson;
  dtOptions: DataTables.Settings = {};
  title = Title;
  brand: any = [];
  models$!: Observable<any[]>;

  constructor(
    private ms: ConnectService,
    private uService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = ModelsTableJson;
    this.models$ = this.ms.getData('tables/models');
    this.ms.getData('tables/brands').subscribe(res =>
      this.fields[1]['templateOptions'].options = res );
  }

  onSubmit() {
    if (this.form.valid) {
      const value: any = this.form.value;
      if (value._id) {
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
    this.form.reset();
    this.form.patchValue({
      _id: ev._id,
      brand: ev.brandId._id,
      name: ev.name
    });
  }
  onTrash(ev: any) {
    this.uService.setAlert({
      title: 'Estas seguro?',
      text: "Quieres eliminar este modelo!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, quiero eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ms.deleteData(`tables/models/${ev._id}`).
        subscribe(() => {
          this.uService.setAlert({
            icon: 'success',
            title: 'Eliminado!',
            text: 'Tu modelo fue eliminado.',
          });
          this.models$ = this.ms.getData('tables/models');
        })
      }
    });
  }

  private add(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand
    }
    this.ms.postData('tables/models', data)
    .subscribe(() => {
      this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/models');
    })

  }
  private save(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand,
    }
    this.ms.patchData(`tables/models/${item._id}`, data)
    .subscribe(() => {
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/models');
    })
  }
}
