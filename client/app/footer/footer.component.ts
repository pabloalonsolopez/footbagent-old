import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router'

@Component({
	selector: 'fa-footer',
	templateUrl: './app/footer/footer.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class FooterComponent implements OnInit{

	private show: boolean = false

	constructor(private router: Router) { }

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
			this.show = (event.url !== '/login' && event.url !== '/signup')
		})
	}
	
}