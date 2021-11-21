
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  username: string = '';
  password: string = '';
  sub!: Subscription;


  constructor(private authenticationService: AuthenticationService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
    // console.log(this.user);
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.sub = this.authenticationService.login(this.username, this.password).subscribe({
      next: user => {
        sessionStorage.setItem('userDetails', JSON.stringify(user));  
        this.router.navigate(['/welcome']);
      },
      error: err => this.snackBar.open("Incorrect credentials", "", {
        duration:2000,
        panelClass: ['blue-snackbar']
      })
    });

  }

}



