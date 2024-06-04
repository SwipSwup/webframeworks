import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

export const routes: Routes = [
  {path: 'landing', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', redirectTo: '/landing'}
];
