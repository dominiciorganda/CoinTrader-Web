import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/authentication/user';
@Component({
  selector: 'ct-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username: string = '';

  constructor() { }

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser(): void {
    let text = sessionStorage.getItem("userDetails");
    
  if (text) {
    let user = JSON.parse(text) as IUser;
    this.username = user.username;
  }
  }

}


