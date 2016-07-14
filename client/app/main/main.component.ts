import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { AuthService} from '../shared/auth.service'

@Component({
	selector: 'main',
	templateUrl: './app/main/main.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class MainComponent {

	constructor(private authService: AuthService) { }

}