import { RouterConfig, provideRouter } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { StyleguideComponent } from './styleguide/styleguide.component'

import { MainRoutes } from './main/main.routes'

export const routes: RouterConfig = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'styleguide', component: StyleguideComponent },
  ...MainRoutes
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]