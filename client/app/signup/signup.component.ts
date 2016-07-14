import { Component, OnInit } from '@angular/core'
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'

import { ValidationService } from '../shared/validation.service'
import { AuthService } from '../shared/auth.service'

import { User } from '../users/user'

@Component({
	selector: 'signup',
	templateUrl: './app/signup/signup.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class SignupComponent implements OnInit {
	signupForm: FormGroup
	user: User
	error: any

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
	      'firstName': ['', Validators.required],
	      'lastName': ['', Validators.required],
	      'username': ['', [Validators.required, ValidationService.email]],
	      'password': ['', Validators.required]
	    })
	}

	onSubmit() {
		this.user = this.signupForm.value
		this.authService.signup(this.user)
            .subscribe(
            	response => this.router.navigate(['/dashboard']),
            	error => this.error = error)
	}
}