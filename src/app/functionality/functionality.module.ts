import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoinComponent } from './coin/coin.component';
import { WalletComponent } from './wallet/wallet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoinlistComponent } from './coinlist/coinlist.component';
import { MatCardModule } from '@angular/material/card';
import { CoinGuard } from './coin/coin.guard';
import { SellComponent } from './sell/sell.component';
import { BuyComponent } from './buy/buy.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    CoinComponent,
    WalletComponent,
    CoinlistComponent,
    SellComponent,
    BuyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "welcome", component: WelcomeComponent },

      { path: "coin/:coinName", canActivate: [CoinGuard] ,component: CoinComponent },
      // { path: "coin/ethereum", component: CoinComponent },
      // { path: "coin/dogecoin", component: CoinComponent },
      // { path: "coin/elrond", component: CoinComponent },
      // { path: "coin/dash", component: CoinComponent },
      // { path: "coin/filecoin", component: CoinComponent },
      // { path: "coin/binancecoin", component: CoinComponent },
      // { path: "coin/bitcoincash", component: CoinComponent },
      // { path: "coin/litecoin", component: CoinComponent },
      { path: "wallet", component: WalletComponent },
      { path: "coinList", component: CoinlistComponent },
      { path: "sell", component: SellComponent },
      { path: "buy", component: BuyComponent },
      { path: "**", redirectTo: 'welcome', pathMatch: 'full' },



    ]),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
    

  ],
  exports: [
    RouterModule
  ]
})
export class FunctionalityModule { }
