import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './Views/pages/pages.component';
import { LoginComponent } from './Views/user/login/login.component';
import { RegisterComponent } from './Views/user/register/register.component';
import { authGuard } from './Views/core/guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () =>
      import('./Views/pages/pages.module').then((m) => m.PagesModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
