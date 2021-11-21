import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICoin } from '../coin';
import { CoinService } from '../coin/coin.service';
import { WalletService } from '../wallet/wallet.service';
import { IWalletCoin } from '../wallet/walletcoin';

@Component({
  selector: 'ct-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  coinList: string[] = [];
  showCard: boolean = false;
  actualValue: number = 0;
  errorMessage: string = '';
  amount: number = 0;
  sellAmount: number = 0;
  walletCoins: IWalletCoin[] = []
  coinAmount: number | undefined = 0;
  inputAmount: number = 0;
  coinName: string = '';
  message: string = '';

  constructor(private coinService: CoinService, private walletService: WalletService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.coinList = coinList;

    this.refreshWallet();
  }

  onBuy(): void {
    
      if ( this.inputAmount==0 || this.sellAmount == 0) {
        this.snackBar.open("Incorrect amount", "", {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
      }
      else {
        this.walletService.makeTransaction(this.coinName.toUpperCase(), this.inputAmount, this.actualValue,
          this.sellAmount, 'BUY').subscribe({
            next: data => {
              console.log(data)
              this.message = data;
              if (this.message == 'Transaction added')
                this.snackBar.open(this.coinName + " bought", "", {
                  duration: 2000,
                  panelClass: ['blue-snackbar']
                }),
                  this.refreshWallet();
              if (this.coinAmount)
                this.coinAmount += this.inputAmount;
            },
            error: err => this.errorMessage = err
          });
      }
  

  }

  refreshCoinAmount(coinName: string): void {
    if (coinName && this.walletCoins) {
      console.log(coinName);
      
      this.coinAmount = this.walletCoins.find(element => element.coinName.toLowerCase() == coinName)?.amount;
      if(!this.coinAmount)  {
        this.coinAmount = 0;
      }
      
      console.log(this.coinAmount);
    }
  }

  refreshWallet(): void {
    this.walletService.getWallet().subscribe({
      next: walletCoins => {
        this.roundList(walletCoins);
        this.walletCoins = walletCoins;
        console.log(walletCoins)
      },
      error: err => console.log(err)
    });
  }

  roundList(coins: IWalletCoin[]): void {
    for (var coin of coins) {
      this.roundWalletCoin(coin);
    }

  }

  onChange(event: any): void {
    const amount = event.target.value;
    this.sellAmount = amount * this.actualValue;
  }

  changeCard(): void {
    this.showCard = !this.showCard;
  }

  chooseCoin(coin: string): void {
    this.changeCard();
    this.getActual(coin);
    this.refreshCoinAmount(coin);
    this.coinName = coin;
  }

  getActual(coinName: string): void {
    this.coinService.getActual(coinName).subscribe({
      next: coin => {
        this.round(coin);
        this.actualValue = coin.price;
        console.log(this.actualValue);
      },
      error: err => this.errorMessage = err
    });

  }

  roundWalletCoin(coin: IWalletCoin): void {
    coin.amount = Math.round((coin.amount + Number.EPSILON) * 100) / 100;
    coin.actualPrice = Math.round((coin.actualPrice + Number.EPSILON) * 100) / 100;
    coin.paid = Math.round((coin.paid + Number.EPSILON) * 100) / 100;
    coin.value = Math.round((coin.value + Number.EPSILON) * 100) / 100;
  }

  round(coin: ICoin): void {
    coin.price = Math.round((coin.price + Number.EPSILON) * 100) / 100;
  }

  mapCoinNameToShortcut(coinName: string): string {
    switch (coinName.toLowerCase()) {
      case 'bitcoin': return "btc";
      case 'binancecoin': return 'bnb';
      case 'bitcoincash': return "bch";
      case 'dash': return 'dash';
      case 'elrond': return "erd";
      case 'ethereum': return 'eth';
      case 'dogecoin': return "doge";
      case 'filecoin': return 'fil';
      case 'litecoin': return "ltc";
      default: return coinName;
    }
  }

  getLogo(coinName: string): string {
    return "assets/" + this.mapCoinNameToShortcut(coinName).toLowerCase() + '.png';
  }

  getImage(): string {
    return "assets/" + this.mapCoinNameToShortcut(this.coinName).toLowerCase() + '.png';
  }

  getCoinName(coinName: string): string {
    if (!coinName) return '';
    return coinName.charAt(0).toUpperCase() + coinName.slice(1);
  }


}

const coinList = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'filecoin', 'elrond', 'binancecoin', 'bitcoincash', 'dash'];
