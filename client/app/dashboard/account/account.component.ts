import { Component } from '@angular/core'
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl } from '@angular/forms'

import { ValidationService } from '../../shared/validation.service'
import { AuthService } from '../../shared/auth.service'

@Component({
	selector: 'fa-account',
	templateUrl: './app/dashboard/account/account.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES]
})

export class AccountComponent {
	updateProfileForm: FormGroup
	updatePasswordForm: FormGroup
	updateProfileFormError: string
	updateProfileFormMessage: string
	updatePasswordFormError: string
	updatePasswordFormMessage: string
	updateProfileFormSubmitted: boolean = true
	updatePasswordFormSubmitted: boolean = true

	constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

	ngOnInit() {
		this.buildUpdateProfileForm()
		this.buildUpdatePasswordForm()
	}

	onUpdateProfile() { 
		this.updateProfileFormError = null
		this.updateProfileFormMessage = null
		this.authService.updateProfile(this.updateProfileForm.value)
            .subscribe(
            	response => this.updateProfileFormMessage = 'Your profile has been updated successfully.',
            	error => {
            		this.updateProfileFormError = 'Email entered is already used by other user.'
            		this.resetUpdateProfileForm()
            	})
	}

	onUpdatePassword() { 
		this.updatePasswordFormError = null
		this.updatePasswordFormMessage = null
		this.authService.updatePassword(this.updatePasswordForm.value)
            .subscribe(
            	response => {
            		this.updatePasswordFormMessage = 'Your password has been updated successfully.'
            		this.resetUpdatePasswordForm()
            	},
            	error => {
            		this.updatePasswordFormError = "Current password is not correct."
            		this.resetUpdatePasswordForm()
            	})
	}

	buildUpdateProfileForm() {
		this.updateProfileForm = this.formBuilder.group({
	      username: [this.authService.profile.username, ValidationService.email],
	      name: [this.authService.profile.name, ValidationService.required]
	    })
	}

	buildUpdatePasswordForm() {
		this.updatePasswordForm = this.formBuilder.group({
	      currentpassword: ['', ValidationService.required],
      	  newpassword: ['', ValidationService.password],
      	  confirmpassword: ['', ValidationService.required]
	    })
	    this.updatePasswordForm.controls['confirmpassword'].setValidators([ValidationService.required, ValidationService.equal(this.updatePasswordForm.controls['newpassword'])])

	}

	resetUpdateProfileForm() {
		this.buildUpdateProfileForm()
        this.updateProfileFormSubmitted = false
		setTimeout(() => this.updateProfileFormSubmitted = true, 0)
	}

	resetUpdatePasswordForm() {
		this.buildUpdatePasswordForm()
        this.updatePasswordFormSubmitted = false
		setTimeout(() => this.updatePasswordFormSubmitted = true, 0)
	}
}