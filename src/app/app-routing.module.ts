import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [

  {path: 'login', component: LoginComponent},

  //blank route redirect
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // lazzyload
  {path: 'admin', canActivate: [AuthGuard] , loadChildren: () => import('./admin-layout/admin/admin.module').then((m) => m.AdminModule)},

  // worng route
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
