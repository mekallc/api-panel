export const MenuDataJson = [
  { name: 'Home', url: '' },
  { name: 'Tablas', url: '',
    children: [
      { name: 'Paises', url: 'tables/countries' },
      { name: 'Categorias', url: 'tables/categories' },
      { name: 'Tipo Vehiculo', url: 'tables/vehicles' },
      { name: 'Marca', url: 'tables/brands' },
      { name: 'Modelo', url: 'tables/models' },
    ]
  },
  { name: 'Servicios', url: 'services' },
  { name: 'Usuários', url: '',
  children: [
    { name: 'Meka LT', url: 'companies' },
    { name: 'Meka Cliente', url: 'customers' },
  ]
  },
  { name: 'Otros', url: '',
  children: [
    { name: 'Banner', url: 'banners' },
    { name: 'Idiomas', url: 'languages' },
    { name: 'Chat Soporte', url: 'soporte' },
    { name: 'Notificaciones', url: 'push' },
  ]
},
]

