import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: 'app-signup-page', component: SignupPageComponent},
  { path: 'app-login-page', component: LoginPageComponent},
  { path: 'app-home-page', component: HomePageComponent},
  { path: 'app-profile-page', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
