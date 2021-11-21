import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ct-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title: string = 'Welcome to CoinTrader';
  subtitle: string = 'Trade crypto fast';

  constructor() { }

  ngOnInit(): void {
  }


}
