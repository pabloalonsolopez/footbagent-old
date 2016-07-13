import { Directive } from '@angular/core'
import { NG_VALIDATORS, FormControl } from '@angular/forms'

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
  	{
  		provide: NG_VALIDATORS,
  		useValue: function(formControl: FormControl) {
  			return { validateEmail: { valid: false } }
  		},
  		multi: true
  	}]
})

export class ValidateEmailDirective { }