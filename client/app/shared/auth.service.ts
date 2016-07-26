import { Injectable } from '@angular/core'
import { Headers, RequestOptions, Http } from '@angular/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt'

@Injectable()
export class AuthService {

  private authUrl = 'api/auth'
  
  private jwtHelper: JwtHelper = new JwtHelper()
  
  profile: any

  constructor(private http: Http, private router: Router, private authHttp: AuthHttp) {
    let token = localStorage.getItem('id_token')
    if (token) {
      this.profile = this.jwtHelper.decodeToken(token)
    }
  }

  signup(data: any): Observable<any> {
    let body = JSON.stringify(data)
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

  login(data: any): Observable<any> {
    let body = JSON.stringify(data)
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

  updateProfile(data: any): Observable<any> {
    let body = JSON.stringify(data)
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/updateprofile`
    return this.authHttp.post(url, body, options)
      .map(response => {
        let token = response.json().data.id_token
        localStorage.setItem('id_token', token)
        this.profile = this.jwtHelper.decodeToken(token)
        return response.json().data
      })
      .catch(this.handleError)
  }

  updatePassword(data: any): Observable<any> {
    let body = JSON.stringify(data)
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let url = `${this.authUrl}/updatepassword`
    return this.authHttp.post(url, body, options)
      .map(response => {
        return response.json().data
      })
      .catch(this.handleError)
  }

  isAuthenticated(): boolean {
    return tokenNotExpired()
  }

  signout() {
    this.router.navigate(['/login'])
    localStorage.removeItem("id_token")
    this.profile = null
  }

  private handleError(error: any) {
    console.error(error.json())
    return Observable.throw(error.json())
  }

}