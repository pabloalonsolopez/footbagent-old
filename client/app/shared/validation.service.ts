import { Injectable } from '@angular/core'
import { FormGroup, AbstractControl, FormControl } from '@angular/forms'

@Injectable()
export class ValidationService {
    
    static required(control: FormControl) {
        if (control.value != '' && control.value.trim() != '') {
            return null
        } else {
            return { 'required': true }
        }
    }

    static email(control: FormControl) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null
        } else {
            return { 'email': true }
        }
    }

    static password(control: FormControl) {
        if (control.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/)) {
            return null
        } else {
            return { 'password': true }
        }
    }

    static equal(controlTarget: AbstractControl) {
        return (control: FormControl) => {
            if (control.value == <FormControl>controlTarget.value) {
                return null
            } else {
                return { 'equal': true }
            }
        }
    }
    
}