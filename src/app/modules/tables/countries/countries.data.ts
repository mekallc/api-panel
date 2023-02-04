import { FormlyFieldConfig } from "@ngx-formly/core";

export const CountriesFormlyJson: FormlyFieldConfig[] = [
  {
    key: '_id',
    type: 'input',
    hide: true,
    templateOptions: {
      label: 'ID',
      readonly: true,
      disabled: true
    }
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Pais',
      placeholder: 'Nombre del país',
      required: true,
    }
  },
  {
    key: 'iso2',
    type: 'input',
    templateOptions: {
      label: 'ISO2',
      placeholder: '',
      required: true,
      maxLength: 2
    },
  },
  {
    key: 'iso3',
    type: 'input',
    templateOptions: {
      label: 'ISO3',
      required: true,
      maxLength: 3
    },
  },
  {
    key: 'phone_code',
    type: 'input',
    templateOptions: {
      label: 'Codigo Tetéfono',
      placeholder: '',
      required: true,
      maxLength: 4
    },
  },
  {
    key: 'distance',
    type: 'number',
    hide: false,
    templateOptions: {
      label: 'Distancia media',
      placeholder: 'distancia en metros'
    }
  },
  {
    key: 'status',
    type: 'checkbox',
    defaultValue: true,
    templateOptions: {
      label: 'Status'
    }
  }
];

export const CountriesTableJson = {
  title: ['País', 'ISO2', 'ISO3', 'Codigo Telefone', 'Distancia'],
  data: ['name', 'iso2', 'iso3', 'phone_code', 'distance']
}

export const Title = 'Paises Activos';
