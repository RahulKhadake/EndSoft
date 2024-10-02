

import { CommonModule } from '@angular/common';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet,CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isPasswordVisible: boolean = false; // Initial state is hidden
  users: any[] = [];

  showAlert: boolean = false; // For managing alert visibility
  alertMessage: string = ''; // For storing alert message
  alertType: string = 'success'; // For alert type (success, danger, etc.)



  UserLoginObj:any={
    firstName:'',
    password:''

  }
  router=inject(Router);

  LoginUser() {
    const isLocalData = localStorage.getItem("Angular18");
    console.log(isLocalData, "Checking Rk");

    if (isLocalData !== null) {
      this.users = JSON.parse(isLocalData);

      console.log(this.UserLoginObj, "UserLoginObj values");  // Check the values being entered for login
      console.log(this.UserLoginObj.firstName, "UserLoginObj FirstName");

      const isUserFound = this.users.find(
        (m: any) => 
          m.firstName === this.UserLoginObj.firstName.trim() &&
          m.password === this.UserLoginObj.password.trim()  // Password comparison without toLowerCase
      );

      if (isUserFound !== undefined) {
        this.alertMessage = "Login Successful";
        this.alertType = 'success'; // Set alert type to success
        this.showAlert = true;

        // Optionally, store the logged-in user session
        localStorage.setItem('loggedInUser', JSON.stringify(isUserFound));

        this.router.navigateByUrl('Userlistpage');
      } else {
        this.alertMessage = "Username or Password is Wrong";
        this.alertType = 'danger'; // Set alert type to danger
        this.showAlert = true;
        console.log("Comparing:", this.UserLoginObj.firstName);
        console.log("Comparing: ", this.UserLoginObj.password);
      }
    } else {
      this.alertMessage = "No User Found";
      this.alertType = 'danger'; // Set alert type to danger
      this.showAlert = true;
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
}
