import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { AuthService} from '../shared/auth.service'

import { DropdownDirective } from '../shared/dropdown.directive'
import { DropdownOpenDirective } from '../shared/dropdown-open.directive'

@Component({
	selector: 'main',
	templateUrl: './app/main/main.component.html',
	directives: [ROUTER_DIRECTIVES, DropdownDirective, DropdownOpenDirective]
})

export class MainComponent {

	constructor(private authService: AuthService) { }

}