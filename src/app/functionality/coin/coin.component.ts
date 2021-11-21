import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { interval, Subscription } from 'rxjs';
import { expand } from 'rxjs/operators';
import { ICoin } from '../coin';
import { CoinService } from './coin.service';


@Component({
  selector: 'ct-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit, OnDestroy {

  coinName: string | null = '';
  sub!: Subscription;
  errorMessage: string = '';
  actualCoin: ICoin | undefined;
  maxCoin: ICoin | undefined;
  anualMinCoin: ICoin | undefined;
  anualMaxCoin: ICoin | undefined;
  coinList: ICoin[] | undefined;
  chart: Chart | undefined;
  interval: ReturnType<typeof setTimeout> | undefined;
  @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;
  displayName: string = '';



  constructor(private route: ActivatedRoute, private coinService: CoinService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const coinName = this.route.snapshot.paramMap.get('coinName');
    this.coinName = coinName;
    // this.route.snapshot.url.reverse().shift()?.path;
    
    this.getActual();
    this.getMax();
    this.getAnualMax();
    this.getAnualMin();
    this.getLastX();

    this.interval = setInterval(() => { this.getActual() }, 10000);

  }

  ngOnDestroy(): void {
    if (this.interval)
      clearInterval(this.interval);
  }

  getActual(): void {
    if (this.coinName) {
      this.coinService.getActual(this.coinName).subscribe({
        next: coin => {
          this.round(coin);
          this.actualCoin = coin;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  getMax(): void {
    if (this.coinName) {
      this.coinService.getMax(this.coinName).subscribe({
        next: coin => {
          this.round(coin);
          this.maxCoin = coin;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  getAnualMax(): void {
    if (this.coinName) {
      this.coinService.getAnualMax(this.coinName).subscribe({
        next: coin => {
          this.round(coin);
          this.anualMaxCoin = coin;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  getAnualMin(): void {
    if (this.coinName) {
      this.coinService.getAnualMin(this.coinName).subscribe({
        next: coin => {
          this.round(coin);
          this.anualMinCoin = coin;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  getLastX(number: number = 32): void {
    if (this.coinName) {
      this.coinService.getLastX(this.coinName, number).subscribe({
        next: coins => {
          this.roundList(coins);
          this.coinList = coins;
          this.drawChart(this.coinList);
        },
        error: err => this.errorMessage = err
      });
    }
  }


  updateChart(chartDays: string): void {

    if (this.validateChartDays(chartDays)) {

      this.chart?.destroy();

      const number = Number(chartDays);

      this.getLastX(number);
    }
    else {
      this.snackBar.open("Invalid chart input", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      })
    }
  }

  validateChartDays(chartDays: string): boolean {
    const number = Number(chartDays);
    return number > 1 && number <= 2000;

  }

  getCoinPrices(coinList: ICoin[]): number[] {
    return coinList.map(function (coin) { return coin.price; });
  }

  getCoinDates(coinList: ICoin[]): string[] {
    return coinList.map(function (coin) { return coin.date; });
  }


  round(coin: ICoin): void {
    coin.price = Math.round((coin.price + Number.EPSILON) * 100) / 100;
  }

  roundList(coins: ICoin[]): void {
    for (var coin of coins) {
      this.round(coin);
    }

  }

  getGradient(coinName: string): any {

    switch (coinName) {
      case 'bitcoin':
      case "binancecoin":
      case "dogecoin": {
        const gradient = this.chartCanvas!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0, 'rgba(247,147,26,.5)');
        gradient.addColorStop(1, 'rgba(255,193,119,0)');
        return gradient;
      }
      case 'elrond':
      case 'litecoin': {
        const gradient = this.chartCanvas!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0, 'rgba(27,30,54,.5)');
        gradient.addColorStop(1, 'rgba(46,49,72,0)');
        return gradient;

      }
      case 'ethereum':
      case 'dash':
      case 'filecoin': {
        const gradient = this.chartCanvas!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0, 'rgba(78,56,216,.5)');
        gradient.addColorStop(1, 'rgba(118,106,192,0)');
        return gradient;
      }
      case 'bitcoincash': {
        const gradient = this.chartCanvas!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0, 'rgba(17,175,38,0.4321078773306197)');
        gradient.addColorStop(1, 'rgba(246,246,246,1)');
        return gradient;
      }
      default: return null;
    }

  }

  getCoinName(coinName: string | null): string {
    if (!coinName) return '';
    return coinName.charAt(0).toUpperCase() + coinName.slice(1);
  }

  getLogo(coinName: string | null): string {
    switch (coinName) {
      case 'bitcoin': return "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg";
      case "binancecoin": return "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/bnb.svg"
      case "dogecoin": return "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=014";
      case 'elrond': return "https://cryptologos.cc/logos/elrond-egld-egld-logo.svg?v=014";
      case 'litecoin': return "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/ltc.svg";
      case 'ethereum': return "assets/eth.png";
      case 'dash': return "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/dash.svg"
      case 'filecoin': return "https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=014";
      case 'bitcoincash': return "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/bch.svg";
      default: return '';
    }
  }

  getBorderColor(coinName: string): string {
    switch (coinName) {
      case 'bitcoin':
      case "binancecoin":
      case "dogecoin": return 'rgba(247,147,26,1)';
      case 'elrond':
      case 'litecoin': return 'rgba(46,49,72,1)';
      case 'ethereum':
      case 'dash':
      case 'filecoin': return 'rgba(118,106,192,1)';
      case 'bitcoincash': return 'rgba(15,204,40,43)';
      default: return 'rgba(247,147,26,1)';
    }
  }

  drawChart(coins: ICoin[]): void {
    const labels = this.getCoinDates(coins);
    const dataSet = this.getCoinPrices(coins);

    if (this.coinName) {
      const gradient = this.getGradient(this.coinName);

      const data = {
        labels: labels,
        datasets: [{
          label: '$',
          data: dataSet,
          fill: true,
          tension: 0.1,
          backgroundColor: gradient,
          borderColor: this.getBorderColor(this.coinName),
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 10,
          pointRadius: 0,
          pointHitRadius: 10,
        }]


      };

      this.chart = new Chart('chartCanvas', {
        type: 'line' as ChartType,
        data: data,

        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: () => [], // or function () { return null; }
                label: function (context) {
                  var label = context.dataset.label || '';

                  if (label) {
                    label += ': ' + context.parsed.y;
                  }
                  return [label, context.label];
                }
              },
              //this removes legend color
              displayColors: false,
              bodySpacing: 2,
              position: 'nearest',
              caretSize: 10,
              backgroundColor: 'rgba(255,255,255,.9)',

              bodyFont: {
                size: 15,
              },
              bodyColor: '#303030'

            }

          },
          font: {
            size: 12,
            family: 'Red Hat Text'
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },


          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
        }
      });
    }

  }


}
