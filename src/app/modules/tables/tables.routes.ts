import { RouterModule, Routes } from "@angular/router";
import { TablesComponent } from "@module/tables/tables.component";

const app: Routes = [
  {
    path: '', component: TablesComponent,
    children: [
      {
        path: 'countries',
        loadChildren: () =>
          import('./countries/countries.module').then( m => m.CountriesModule)
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./brands/brands.module').then( m => m.BrandsModule)
      },
      {
        path: 'models',
        loadChildren: () =>
          import('./models/models.module').then( m => m.ModelsModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then( m => m.CategoriesModule)
      },
    ]
  }
];

export const TablesRoute = RouterModule.forChild(app);
