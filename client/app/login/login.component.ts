import { Component, OnInit } from '@angular/core'
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'

import { AuthService } from '../shared/auth.service'

@Component({
	selector: 'fa-login',
	templateUrl: './app/login/login.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
	
	ngOnInit() {
		this.buildForm()
	}

	onSubmit() { 
		this.authService.login(this.loginForm.value)
            .subscribe(
            	response => this.router.navigate(['/dashboard']),
            	error => {
            		let usernameControl = <FormControl>this.loginForm.controls['username']
            		let passwordControl = <FormControl>this.loginForm.controls['password']
            		switch (error.message) {
            			case 'username':
            				usernameControl.updateValue('')
					        usernameControl.markAsTouched()
					        usernameControl.markAsDirty()
					        usernameControl.setErrors({'invalid': true})
            				passwordControl.updateValue('')
            				break;
            			case 'password':
            				passwordControl.updateValue('')
					        passwordControl.markAsTouched()
					        passwordControl.markAsDirty()
					        passwordControl.setErrors({'invalid': true})
            				break;
            		}
            	})
	}

	buildForm() {
		this.loginForm = this.formBuilder.group({
	      username: [''],
	      password: ['']
	    })
	}
}