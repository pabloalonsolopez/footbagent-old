import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'

@Injectable()
export class ValidationService {
    
    static email(control: FormControl) {
        if (control.value == '' || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null
        } else {
            return { 'emailInvalid': true }
        }
    }
    
}