import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user', 'sign-in']);
const app: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('@core/pages/pages.module').then( m => m.PagesModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@module/users/users.module').then( m => m.UsersModule)
  },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
];

export const AppRoute =
  RouterModule.forRoot(app, { preloadingStrategy: PreloadAllModules });
