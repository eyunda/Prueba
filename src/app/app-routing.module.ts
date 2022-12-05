import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListarComponent } from './pages/admin/listar/listar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { RedesComponent } from './pages/admin/redes/redes.component';


import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path : '',
        component : WelcomeComponent
      },
      {
        path:'usuario',
        component:UsuariosComponent
      },
      {
        path:'listar',
        component: ListarComponent
      },
      {
        path:'usuario/:id',
        component:UsuariosComponent
      },
      {
        path:'redes',
        component:RedesComponent
      }

      
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
