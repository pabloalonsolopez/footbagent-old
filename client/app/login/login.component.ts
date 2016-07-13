import { Component, OnInit } from '@angular/core'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'

import { AuthService } from '../shared/auth.service'

import { User } from '../users/user'

@Component({
	selector: 'login',
	templateUrl: './app/login/login.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
	user: User
	error: any

	constructor(private authService: AuthService, private router: Router) {}
	
	ngOnInit() {
		this.user = new User()
	}

	onSubmit() {
		this.authService.login(this.user)
            .subscribe(
            	response => this.router.navigate(['/dashboard']),
            	error => this.error = <any>error)
	}

}