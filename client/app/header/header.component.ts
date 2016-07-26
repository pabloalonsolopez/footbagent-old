import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router'

import { AuthService} from '../shared/auth.service'

import { DropdownDirective } from '../shared/dropdown.directive'
import { DropdownOpenDirective } from '../shared/dropdown-open.directive'

@Component({
	selector: 'fa-header',
	templateUrl: './app/header/header.component.html',
	directives: [ROUTER_DIRECTIVES, DropdownDirective, DropdownOpenDirective]
})

export class HeaderComponent implements OnInit{

	private show: boolean = false

	constructor(private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
			this.show = (event.url !== '/login' && event.url !== '/signup')
		})
	}
}