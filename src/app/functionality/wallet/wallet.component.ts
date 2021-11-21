import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from 'src/app/authentication/user';
import { WalletService } from './wallet.service';
import { IWalletCoin } from './walletcoin';

@Component({
  selector: 'ct-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {

  walletCoins: IWalletCoin[] | undefined;
  username: string = '';
  money: number = 0;
  interval: ReturnType<typeof setTimeout> | undefined;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.setUserData();
    this.refreshWallet();
    
    this.interval = setInterval(() => { this.refreshWallet() }, 10000);
  }

  ngOnDestroy(): void {
    if (this.interval)
      clearInterval(this.interval);
  }

  setUserData(): void {
    let text = sessionStorage.getItem("userDetails");
    if (text) {
      let user = JSON.parse(text) as IUser;
      this.username = user.username;
      this.money = user.money;
    }
  }

  refreshWallet(): void {
    this.walletService.getWallet().subscribe({
      next: walletCoins => {
        this.roundList(walletCoins);
        this.walletCoins = walletCoins;
      },
      error: err => console.log(err)
    });
  }

  round(coin: IWalletCoin): void {
    coin.amount = Math.round((coin.amount + Number.EPSILON) * 100) / 100;
    coin.actualPrice = Math.round((coin.actualPrice + Number.EPSILON) * 100) / 100;
    coin.paid = Math.round((coin.paid + Number.EPSILON) * 100) / 100;
    coin.value = Math.round((coin.value + Number.EPSILON) * 100) / 100;
  }

  roundList(coins: IWalletCoin[]): void {
    for (var coin of coins) {
      this.round(coin);
    }

  }

  mapCoinNameToShortcut(walletcoin: IWalletCoin): string {
    switch(walletcoin.coinName.toLowerCase()) {
      case 'bitcoin': return "btc";
      case 'binancecoin': return 'bnb';
      case 'bitcoincash': return "bch";
      case 'dash': return 'dash';
      case 'elrond': return "erd";
      case 'ethereum': return 'eth';
      case 'dogecoin': return "doge";
      case 'filecoin': return 'fil';
      case 'litecoin': return "ltc";
      default: return walletcoin.coinName;
    }
  }

  getLogo(walletCoin: IWalletCoin): string {
    return "assets/" + this.mapCoinNameToShortcut(walletCoin).toLowerCase() + '.png';
  }

}
