import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from 'src/app/authentication/user';
import { IWalletCoin } from './walletcoin';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  baseURL: string = 'http://localhost:8081/CoinTrader/wallet';

  constructor(private http: HttpClient) { }

  getWallet(): Observable<IWalletCoin[]> {
    const httpOptions = getHeaders();
    return this.http.get<IWalletCoin[]>(this.baseURL + '/getWallet', httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );

  }

  makeTransaction(coinName: string, amount: number, actualPrice: number, paidPrice: number, type: string): Observable<string> {
    const httpOptions = getStringHeaders();
    return this.http.post(this.baseURL + '/makeTransaction', this.getRegisterRequestBody(coinName, amount, actualPrice, 
      paidPrice,type),
     httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  getRegisterRequestBody(coinName: string, amount: number, actualPrice: number, paidPrice: number, type: string): string {
    return JSON.stringify({
      coin: coinName,
      amount: amount,
      actualPrice: actualPrice,
      paidPrice: paidPrice,
      type: type
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



function getStringHeaders() {
  let text = sessionStorage.getItem("userDetails");
  let jwt = '';
  if (text) {
    let user = JSON.parse(text) as IUser;
    jwt = user.authenticationToken;
  }

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }
    ).set('Authorization', 'Bearer ' + jwt),
    responseType: 'text' as const
  };
  
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

