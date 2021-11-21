import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { CoinService } from '../coin/coin.service';

@Component({
  selector: 'ct-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {

  coins: any[] = coinList;
  chart: Chart | undefined;
  @ViewChild('btcChart') btcChart: ElementRef | undefined;
  @ViewChild('ethChart') ethChart: ElementRef | undefined;
  @ViewChild('erdChart') erdChart: ElementRef | undefined;
  @ViewChild('dashChart') dashChart: ElementRef | undefined;
  @ViewChild('dogeChart') dogeChart: ElementRef | undefined;
  @ViewChild('filChart') filChart: ElementRef | undefined;
  @ViewChild('ltcChart') ltcChart: ElementRef | undefined;
  @ViewChild('bnbChart') bnbChart: ElementRef | undefined;
  @ViewChild('bchChart') bchChart: ElementRef | undefined;
  btcPrice: string | undefined;
  ethPrice: string | undefined;
  erdPrice: string | undefined; 
  dashPrice: string | undefined;
  dogePrice: string | undefined;
  filPrice: string | undefined;
  ltcPrice: string | undefined;
  bnbPrice: string | undefined;
  bchPrice: string | undefined;

  constructor(private router: Router, private coinService: CoinService) { }

  ngOnInit(): void {
    this.drawCharts();
    this.updatePrices();
  }

  drawCharts(): void {
    this.drawBtcChart();
    this.drawEthChart();
    this.drawErdChart();
    this.drawDashChart();
    this.drawDogeChart();
    this.drawFilChart();
    this.drawLtcChart();
    this.drawBnbChart();
    this.drawBchChart();
  }

 
  updatePrices(): void {
    this.updateBitcoinPrice();
    this.updateEthereumPrice();
    this.updateElrondPrice();
    this.updateDashPrice();
    this.updateDogePrice();
    this.updateFilPrice();
    this.updateLtcPrice();
    this.updateBnbPrice();
    this.updateBchPrice();
  }

  onClick(coinName: string): void {
    this.router.navigate(['coin/' + coinName]);
  }

  async drawBtcChart(): Promise<void> {
    let { times, prices } = await btcData();

    const gradient = this.btcChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(247,147,26,.5)');
    gradient.addColorStop(.425, 'rgba(255,193,119,0)');

    this.chart = new Chart('btcChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(247,147,26,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawEthChart(): Promise<void> {
    let { times, prices } = await ethereumData();

    const gradient = this.ethChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(78,56,216,.5)');
  gradient.addColorStop(.425, 'rgba(118,106,192,0)');

    this.chart = new Chart('ethChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(118,106,192,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawErdChart(): Promise<void> {
    let { times, prices } = await elrondData();

    const gradient = this.erdChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(27,30,54,.5)');
  gradient.addColorStop(.425, 'rgba(46,49,72,0)');
    this.chart = new Chart('erdChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(46,49,72,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawDashChart(): Promise<void> {
    let { times, prices } = await dashData();

    const gradient = this.dashChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(78,56,216,.5)');
  gradient.addColorStop(.425, 'rgba(118,106,192,0)');
    this.chart = new Chart('dashChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(118,106,192,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawDogeChart(): Promise<void> {
    let { times, prices } = await dogeData();

    const gradient = this.dogeChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(247,147,26,.5)');
    gradient.addColorStop(.425, 'rgba(255,193,119,0)');
    this.chart = new Chart('dogeChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(247,147,26,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawFilChart(): Promise<void> {
    let { times, prices } = await filecoinData();

    const gradient = this.filChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
     gradient.addColorStop(0, 'rgba(78,56,216,.5)');
  gradient.addColorStop(.425, 'rgba(118,106,192,0)');
    this.chart = new Chart('filChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(118,106,192,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawLtcChart(): Promise<void> {
    let { times, prices } = await litecoinData();

    const gradient = this.ltcChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(27,30,54,.5)');
  gradient.addColorStop(.425, 'rgba(46,49,72,0)');
    this.chart = new Chart('ltcChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(46,49,72,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawBnbChart(): Promise<void> {
    let { times, prices } = await binanceData();

    const gradient = this.bnbChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(247,147,26,.5)');
    gradient.addColorStop(.425, 'rgba(255,193,119,0)');
    this.chart = new Chart('bnbChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(247,147,26,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async drawBchChart(): Promise<void> {
    let { times, prices } = await bitcoincashData();

    const gradient = this.bchChart!.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(17,175,38,0.4321078773306197)');
    gradient.addColorStop(.425, 'rgba(246,246,246,1)');
    this.chart = new Chart('bchChart', {
      type: 'line' as ChartType,
      data: {
        labels: times,
        datasets: [{
          label: '$',
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(15,204,40,43)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },

      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => [] // or function () { return null; }
            },
            //this removes legend color
            displayColors: false,

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
        responsive: false,
        maintainAspectRatio: false,
      }
    });

  }

  async updateBitcoinPrice(): Promise<void> {
    let { times, prices } = await btcData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.btcPrice =   currentPrice + "$";

  }

  async updateEthereumPrice(): Promise<void> {
    let { times, prices } = await ethereumData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.ethPrice =   currentPrice + "$";

  }

  async updateElrondPrice(): Promise<void> {
    let { times, prices } = await elrondData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.erdPrice =   currentPrice + "$";

  }

  async updateDashPrice(): Promise<void> {
    let { times, prices } = await dashData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.dashPrice =   currentPrice + "$";

  }

  async updateDogePrice(): Promise<void> {
    let { times, prices } = await dogeData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.dogePrice =   currentPrice + "$";

  }

  async updateFilPrice(): Promise<void> {
    let { times, prices } = await filecoinData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.filPrice =   currentPrice + "$";

  }

  async updateLtcPrice(): Promise<void> {
    let { times, prices } = await litecoinData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.ltcPrice =   currentPrice + "$";

  }

  async updateBnbPrice(): Promise<void> {
    let { times, prices } = await binanceData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.bnbPrice =   currentPrice + "$";

  }

  async updateBchPrice(): Promise<void> {
    let { times, prices } = await bitcoincashData()
    let currentPrice = prices[prices.length-1].toFixed(2);
    this.bchPrice =   currentPrice + "$";

  }
  

}

const ethereumData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const dashData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=DASH&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const dogeData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=DOGE&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const filecoinData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=FIL&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const litecoinData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=LTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const binanceData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BNB&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}

const bitcoincashData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BCH&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}


const elrondData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=EGLD&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}


const btcData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map((obj: { time: any; }) => obj.time)
  const prices = data.map((obj: { high: any; }) => obj.high)
  return {
    times,
    prices
  }
}


const coinList = [
  { name: 'bitcoin' },
  { name: 'ethereum' },
  { name: 'dogecoin' },
  { name: 'litecoin' },
  { name: 'filecoin' },
  { name: 'elrond' },
  { name: 'binancecoin' },
  { name: 'bitcoincash' },
  { name: 'dash' },
];
