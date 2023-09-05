import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'app-signup-page', component: SignupPageComponent},
  { path: 'app-login-page', component: LoginPageComponent},
  { path: 'app-profile-page/:id', component: ProfilePageComponent},
  { path: 'admin', component: AdminComponent},
  {path: '**', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
