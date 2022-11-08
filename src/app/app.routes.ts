import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const app: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('@core/pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@module/users/users.module').then( m => m.UsersModule)
  },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
];

export const AppRoute =
  RouterModule.forRoot(app, { preloadingStrategy: PreloadAllModules });
