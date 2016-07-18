import { Component, OnInit } from '@angular/core'
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'

import { ValidationService } from '../shared/validation.service'
import { AuthService } from '../shared/auth.service'

@Component({
	selector: 'login',
	templateUrl: './app/login/login.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
	submitted: boolean = true
	loginForm: FormGroup
	error: any

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
	
	ngOnInit() {
		this.buildForm()
	}

	onSubmit() { 
		this.authService.login(this.loginForm.value)
            .subscribe(
            	response => this.router.navigate(['/dashboard']),
            	error => {
            		this.error = error
            		this.reset()
            	})
	}

	buildForm() {
		this.loginForm = this.formBuilder.group({
	      'username': ['', [Validators.required, ValidationService.email]],
	      'password': ['', Validators.required]
	    })
	}

	reset() {
		this.buildForm()
        this.submitted = false
		setTimeout(() => this.submitted = true, 0)
	}
}