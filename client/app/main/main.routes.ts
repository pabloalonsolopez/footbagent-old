import { RouterConfig } from '@angular/router'

import { MainComponent } from './main.component'
import { HomeComponent } from './home/home.component'
import { SupportComponent } from './support/support.component'
import { TermsComponent } from './terms/terms.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { CookiesComponent } from './cookies/cookies.component'

import { DashboardRoutes } from './dashboard/dashboard.routes'

export const MainRoutes: RouterConfig = [
  { path: '', component: MainComponent, 
  	children: [
  	  { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'support', component: SupportComponent },
  	  { path: 'terms', component: TermsComponent },
  	  { path: 'privacy', component: PrivacyComponent },
  	  { path: 'cookies', component: CookiesComponent },
  	  ...DashboardRoutes
    ]
  }
]