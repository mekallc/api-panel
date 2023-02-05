export const MenuDataJson = [
  { name: 'Home', url: '' },
  { name: 'Tablas', url: '',
    children: [
      { name: 'Categorias', url: 'tables/categories' },
      { name: 'Paises', url: 'tables/countries' },
      { name: 'Marca', url: 'tables/brands' },
      { name: 'Modelo', url: 'tables/models' },
    ]
  },
  { name: 'Solicitudes', url: 'services' },
  { name: 'Compañias', url: 'companies' },
  { name: 'Clientes', url: 'customers' },
  { name: 'Servicios', url: '',
  children: [
    { name: 'Banner', url: 'banners' },
    { name: 'Chat Soporte', url: 'soporte' },
    { name: 'Notificaciones', url: 'push' },
  ]
},
]

