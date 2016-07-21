import { Component } from '@angular/core'

import { DropdownDirective } from '../shared/dropdown.directive'
import { DropdownOpenDirective } from '../shared/dropdown-open.directive'

@Component({
	selector: 'styleguide',
	templateUrl: './app/styleguide/styleguide.component.html',
	directives: [DropdownDirective, DropdownOpenDirective]
})

export class StyleguideComponent { }