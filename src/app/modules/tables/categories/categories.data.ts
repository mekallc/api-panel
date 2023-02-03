import { FormlyFieldConfig } from "@ngx-formly/core";

export const CategoriesFormlyJson: FormlyFieldConfig[] = [
  {
    key: '_id',
    type: 'input',
    templateOptions: {
      placeholder: 'ID',
      readonly: true,
    }
  },
  {
    key: 'name',
    type: 'input',
    defaultValue: 'Ayuda',
    templateOptions: {
      label: 'Nombre',
      placeholder: '',
      required: true,
    }
  },
  {
    key: 'picture',
    type: 'file',
    templateOptions: {
      label: 'Ícono',
      required: true,
    }
  },
  {
    key: 'status',
    type: 'checkbox',
    defaultValue: true,
    templateOptions: {
      label: 'Status'
    }
  },
];

export const CategoriesTableJson = {
  title: ['Nombre', 'Icon'],
  data: ['name', 'picture']
}

export const Title = 'Categorias';
