import { Component, OnInit } from '@angular/core'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'

import { AuthService } from '../shared/auth.service'

import { ValidateEmailDirective } from '../shared/validate-email.directive'

import { User } from '../users/user'

@Component({
	selector: 'signup',
	templateUrl: './app/signup/signup.component.html',
	directives: [ROUTER_DIRECTIVES, ValidateEmailDirective]
})

export class SignupComponent implements OnInit {
	user: User
	error: any

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.user = new User()
	}

	onSubmit() {
		this.authService.signup(this.user)
            .subscribe(
            	response => this.router.navigate(['/dashboard']),
            	error => this.error = <any>error)
	}
}