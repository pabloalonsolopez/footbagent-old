import { Injectable }    from '@angular/core'
import { Headers, RequestOptions, Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'

import { User } from '../users/user'

@Injectable()
export class AuthService {

  private authUrl = 'api/auth'
  private jwtHelper: JwtHelper = new JwtHelper()

  constructor(private http: Http, private router: Router) { }

  signup(user: User): Observable<any> {
    let body = JSON.stringify({ user })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/signup`
    return this.http.post(url, body, options)
      .map(response => {
        localStorage.setItem('id_token', response.json().data.id_token)
        localStorage.setItem('profile', this.jwtHelper.decodeToken(response.json().data.id_token)._doc)
        return response.json().data
      })
      .catch(this.handleError)
  }

  login(user: User): Observable<any> {
    let body = JSON.stringify({ user })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/login`
    return this.http.post(url, body, options)
      .map(response => {
        localStorage.setItem('id_token', response.json().data.id_token)
        localStorage.setItem('profile', this.jwtHelper.decodeToken(response.json().data.id_token)._doc)
        return response.json().data
      })
      .catch(this.handleError)
  }

  isAuthenticated(): boolean {
    return tokenNotExpired()
  }

  logout() {
    localStorage.removeItem("id_token")
    localStorage.removeItem("profile")
    this.router.navigate(['/login'])
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg)
    return Observable.throw(errMsg)
  }

}