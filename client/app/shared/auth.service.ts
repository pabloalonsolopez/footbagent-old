import { Injectable } from '@angular/core'
import { Headers, RequestOptions, Http } from '@angular/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'

import { User } from '../users/user'

@Injectable()
export class AuthService {

  private authUrl = 'api/auth'
  
  private jwtHelper: JwtHelper = new JwtHelper()
  private profile: any

  constructor(private http: Http, private router: Router) {
    let token = localStorage.getItem('id_token')
    if (token) {
      this.profile = this.jwtHelper.decodeToken(token)
    }
  }

  signup(user: User): Observable<any> {
    let body = JSON.stringify(user)
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/signup`
    return this.http.post(url, body, options)
      .map(response => {
        let token = response.json().data.id_token
        localStorage.setItem('id_token', token)
        this.profile = this.jwtHelper.decodeToken(token)
        return response.json().data
      })
      .catch(this.handleError)
  }

  login(user: User): Observable<any> {
    let body = JSON.stringify(user)
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/login`
    return this.http.post(url, body, options)
      .map(response => {
        let token = response.json().data.id_token
        localStorage.setItem('id_token', token)
        this.profile = this.jwtHelper.decodeToken(token)
        return response.json().data
      })
      .catch(this.handleError)
  }

  isAuthenticated(): boolean {
    return tokenNotExpired()
  }

  logout() {
    localStorage.removeItem("id_token")
    this.profile = null
    this.router.navigate(['/login'])
  }

  private handleError(error: any) {
    console.error(error.json())
    return Observable.throw(error.json())
  }

}