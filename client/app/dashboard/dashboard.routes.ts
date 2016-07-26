import { RouterConfig } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { AccountComponent } from './account/account.component'
import { NotificationsComponent } from './notifications/notifications.component'

import { ResourcesRoutes } from './resources/resources.routes'

import { AuthGuard } from '../shared/auth.guard'

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, 
  	children: [
  	  { path: '', redirectTo: 'resources', pathMatch: 'full' },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  	  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      ...ResourcesRoutes
    ],
    canActivate: [AuthGuard]
  }
]