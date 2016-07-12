import { RouterConfig } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { DashboardDetailComponent } from './dashboard-detail.component'
import { ResourcesComponent } from './resources/resources.component'

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, 
  	children: [
  	  { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: DashboardDetailComponent },
      { path: 'resources', component: ResourcesComponent }
    ]
  }
]