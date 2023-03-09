import { FormlyFieldConfig } from "@ngx-formly/core";

export const BrandsFormlyJson: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Nombre',
      placeholder: 'Name Brand',
      required: true,
    }
  },
  {
    key: 'vehicles',
    type: 'select',
    props: {
      label: "Marca",
      multiple: true,
      required: true,
      options: [],
      valueProp: "_id",
      labelProp: "name",
      placeholder: 'Selecciona...',
    }
  },
  {
    key: 'status',
    type: 'checkbox',
    defaultValue: true,
    templateOptions: {
      label: 'Status',
    }
  },
];

export const BrandsTableJson = {
  title: ['Nombre', 'Tipo Vehiculo'],
  data: ['name', 'vehicles']
}
