import { FormlyFieldConfig } from "@ngx-formly/core";
import * as moment from 'moment';

export function toDateParser(date: Date, index: number) {
  return date ? moment(date).format('L') : null;
}

export const BannersFormlyJson: FormlyFieldConfig[] = [
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      label: 'Visualizar',
      required: true,
      multiple: true,
      options: [
        {
          label: 'Cliente',
          value: 0
        },
        {
          label: 'LT',
          value: 1
        }
      ]
    }
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name',
      placeholder: 'Name Banner',
      required: true,
    }
  },
  {
    key: 'url',
    type: 'input',
    templateOptions: {
      label: 'Link Destino',
      placeholder: 'URL...',
      required: true,
    }
  },
  {
    key: 'typeUrl',
    type: 'checkbox',
    defaultValue: false,
    templateOptions: {
      label: 'URL Interno',
      required: true,
    }
  },
  {
    key: 'latitude',
    type: 'number',
    templateOptions: {
      label: 'Latitude',
      placeholder: '-25.23234',
      required: true,
    }
  },
  {
    key: 'longitude',
    type: 'number',
    templateOptions: {
      label: 'Longitude',
      placeholder: '-49.2342432',
      required: true,
    }
  },
  {
    key: 'distance',
    type: 'number',
    defaultValue: 1000,
    props: {
      label: 'Distance in meters',
      placeholder: '1000',
      required: true,
    },
  },
  {
    key: 'file',
    type: 'file',
    templateOptions: {
      label: 'Image'
    }
  },
  {
    key: 'start_date',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'Start date'
    },
  },
  {
    key: 'end_date',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'End date'
    },
  },
  {
    key: '_id',
    type: 'hide',
    hide: false,
    templateOptions: {
      label: 'ID'
    }
  },
];

export const CompanyTableJson = {
  title: ['Company', 'Name', 'URL'],
  data: ['typeCompany.name', 'name', '_id']
}

export const BannersTableJson = {
  title: ['Nombre', 'Tipo Usuário', 'Inicio', 'Fin', 'image'],
  data: ['name', 'type', 'start', 'end', 'picture']
}

export const Title = 'Banners';
