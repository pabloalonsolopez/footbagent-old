import { RouterConfig, provideRouter } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { DashboardComponent } from './dashboard/dashboard.component'

export const routes: RouterConfig = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]