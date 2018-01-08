import { Injectable } from '@angular/core';
import {User} from "./login-form/user";
import {Credentials} from "./login-form/credentials";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {environment} from "../environments/environment";


@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  private handleResponse(res: Response) {
    localStorage.setItem('jwt', res.headers.get('Authorization'));
  }

  login(credentials: Credentials): Observable<User> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = 'email=' + credentials.email + '&password=' + credentials.password;

    return this.http.post(environment.apiUrl + '/login', body, options).map(this.handleResponse).catch(this.handleError);

  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
