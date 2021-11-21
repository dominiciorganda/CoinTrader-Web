import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from 'src/app/authentication/user';
import { ICoin } from '../coin';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  baseURL: string = 'http://localhost:8081/CoinTrader/';

  constructor(private http: HttpClient) { }


  getActual(coinName: string): Observable<ICoin> {
    const httpOptions = getHeaders();

    return this.http.get<ICoin>(this.baseURL + coinName + '/getActual', httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  getMax(coinName: string): Observable<ICoin> {
    const httpOptions = getHeaders();

    return this.http.get<ICoin>(this.baseURL + coinName + '/getMax', httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  getAnualMax(coinName: string): Observable<ICoin> {
    const httpOptions = getHeaders();

    return this.http.get<ICoin>(this.baseURL + coinName + '/getAnualMax', httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  getAnualMin(coinName: string): Observable<ICoin> {
    const httpOptions = getHeaders();

    return this.http.get<ICoin>(this.baseURL + coinName + '/getAnualMin', httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  getLastX(coinName: string, amount: number): Observable<ICoin[]> {
    const httpOptions = getHeaders();

    return this.http.get<ICoin[]>(this.baseURL + coinName + '/getLastX/'+ amount, httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

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


function getHeaders() {

  let text = sessionStorage.getItem("userDetails");
  let jwt = '';
  if (text) {
    let user = JSON.parse(text) as IUser;
    jwt = user.authenticationToken;
  }

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }).set('Authorization', 'Bearer ' + jwt)
  };

}

