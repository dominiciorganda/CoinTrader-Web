import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const coinName = route.url.reverse().shift()?.path;

      console.log(coinName);
    if (!coinName || !coinList.includes(coinName)) {
      alert('Invalid coin selected');
      this.router.navigate(['/coinList']);
      return false;
    }
    return true;
  }

}


const coinList = ['bitcoin',
  'ethereum',
  'dogecoin',
  'litecoin',
  'filecoin',
  'elrond',
  'binancecoin',
  'bitcoincash',
  'dash'
];
