import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';
  sub!: Subscription;


  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  onRegister(): void {

    if (this.validate(this.username, this.email, this.password, this.confirmPassword)) {

      this.sub = this.authenticationService.register(this.username, this.email, this.password).subscribe({
        next: data => {
          this.message = data,
            console.log(this.message);
          if (this.message == 'User Registration Succesful')
            this.snackBar.open("Please activate the account from email", "", {
              duration: 2000,
              panelClass: ['blue-snackbar']
            })
        },
        error: err => this.errorMessage = err
      });

    }
    else {
      this.snackBar.open("Invalid inputs! Please check again", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      })
    }

  }

  validate(username: string, email: string, password: string, confirmPassword: string): boolean {
    const usernameRegex = new RegExp('[0-9a-zA-Z_]{6,30}');
    const emailRegex = new RegExp('[a-zA-Z0-9]{3,}@[a-zA-Z][a-zA-Z0-9]{2,}\.[a-z]{2,}');
    const passwordRegex = new RegExp('[0-9a-zA-Z_]{6,30}');

    return confirmPassword == password && usernameRegex.test(username) && emailRegex.test(email) && passwordRegex.test(password);
  }



}
