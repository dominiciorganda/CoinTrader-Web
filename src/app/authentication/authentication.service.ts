import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUser } from './user';
import { CoinService } from '../functionality/coin/coin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseURL: string = 'http://localhost:8081/CoinTrader/auth';

  constructor(private http: HttpClient) { }

  // get user(): IUser {
  //   if(this._user)
  //     return this._user;
  //   return null as any;
  // }

  // set user(newUser: IUser){
  //   this._user = newUser;
  // }

  


  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.baseURL + '/login', this.getRequestBody(username, password), httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  register(username: string, email: string, password: string): Observable<string> {
    return this.http.post(this.baseURL  + '/register', this.getRegisterRequestBody(username,email,password),
     httpStringOptions).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getRegisterRequestBody(usr: string, em: string, pwd: string): string {
    return JSON.stringify({
      username: usr,
      email: em,
      password: pwd
    });
  }

  getRequestBody(usr: string, pwd: string): string {
    return JSON.stringify({
      username: usr,
      password: pwd
    });
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}


const httpStringOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as const
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};