import { RouterConfig, provideRouter } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { SupportComponent } from './support/support.component'
import { TermsComponent } from './terms/terms.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { CookiesComponent } from './cookies/cookies.component'

import { DashboardRoutes } from './dashboard/dashboard.routes'

export const routes: RouterConfig = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'support', component: SupportComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'cookies', component: CookiesComponent },
  ...DashboardRoutes
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]