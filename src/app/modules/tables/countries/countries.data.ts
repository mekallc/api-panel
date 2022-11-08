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
      label: 'Name',
      placeholder: 'Name the country',
      required: true,
    }
  },
  {
    key: 'iso2',
    type: 'input',
    templateOptions: {
      label: 'ISO2',
      placeholder: 'Name the country',
      required: true,
      maxLength: 2
    },
  },
  {
    key: 'iso3',
    type: 'input',
    templateOptions: {
      label: 'ISO3',
      placeholder: 'Name the country',
      required: true,
      maxLength: 3
    },
  },
  {
    key: 'phone_code',
    type: 'input',
    templateOptions: {
      label: 'Code Phone',
      placeholder: 'Code the phone',
      required: true,
      maxLength: 4
    },
  },
  {
    key: 'distance',
    type: 'number',
    hide: false,
    templateOptions: {
      label: 'Distance media'
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
  title: ['Name', 'ISO2', 'ISO3', 'Codigo Telefone', 'Distance'],
  data: ['name', 'iso2', 'iso3', 'phone_code', 'distance']
}
