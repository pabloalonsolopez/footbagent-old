import { RouterConfig } from '@angular/router'

import { DashboardComponent } from './dashboard.component'

import { ResourcesRoutes } from './resources/resources.routes'

import { AuthGuard } from '../../shared/auth.guard'

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, 
  	children: [
  	  { path: '', redirectTo: 'resources', pathMatch: 'full' },
      ...ResourcesRoutes
    ],
    canActivate: [AuthGuard]
  }
]