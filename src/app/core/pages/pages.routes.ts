import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from "@angular/router";

const app: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then( m => m.HomeModule)
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('@module/tables/tables.module').then( m => m.TablesModule)
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('@module/customer/customer.module').then( m => m.CustomerModule)
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('@module/companies/companies.module').then( m => m.CompaniesModule)
      },
      {
        path: 'banners',
        loadChildren: () =>
          import('@module/banners/banners.module').then( m => m.BannersModule)
      },
      {
        path: 'services',
        loadChildren: () =>
          import('@module/services/services.module').then( m => m.ServicesModule)
      },
    ],
  },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
];

export const PagesRoute =
  RouterModule.forChild(app);
