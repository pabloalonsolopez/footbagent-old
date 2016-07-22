import { RouterConfig } from '@angular/router'

import { ResourcesComponent } from './resources.component'
import { ResourcesListComponent } from './resources-list.component'
import { ResourceNewComponent } from './resource-new.component'

export const ResourcesRoutes: RouterConfig = [
  { path: 'resources', component: ResourcesComponent, 
  	children: [
  	  { path: '', component: ResourcesListComponent },
      { path: 'new', component: ResourceNewComponent }
    ]
  }
]