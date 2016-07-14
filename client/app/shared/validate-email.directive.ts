import { Directive } from '@angular/core'
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms'

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateEmailDirective, multi: true}]
})

export class ValidateEmailDirective implements Validator {
  
  validate(formControl: FormControl): {[key: string]: any} {
    let EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return EMAIL_REGEXP.test(formControl.value) ? null : { "validateEmail": true }
  }

}