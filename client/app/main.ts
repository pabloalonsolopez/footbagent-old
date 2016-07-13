import { bootstrap } from '@angular/platform-browser-dynamic'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { HTTP_PROVIDERS } from '@angular/http'

import { APP_ROUTER_PROVIDERS } from './app.routes'

import { AuthService } from './shared/auth.service'
import { AuthGuard } from './shared/auth.guard'

import { AppComponent } from './app.component'

bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
	HTTP_PROVIDERS,
	APP_ROUTER_PROVIDERS,
	AuthService,
	AuthGuard
]).catch((err: any) => console.error(err))