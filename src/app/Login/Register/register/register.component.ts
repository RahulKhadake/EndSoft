import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword: boolean = false;
  successMessage: string = '';
  registerForm!: FormGroup;
  showAlert: boolean = false;
  constructor(private router: Router, private fb: FormBuilder
    
  ) {
    
  }

  UserRegisterObj:any={
    firstName:'',
    address:'',
    mobileNo:'',
    emailId:'',
    password:''
  
  }
  onSubmit(form: any): void {
    console.log(this.UserRegisterObj, "All Data Checking");

    const isLocalData = localStorage.getItem("Angular18");

    if (isLocalData !== null) {
      const localArray = JSON.parse(isLocalData); 
      localArray.push(this.UserRegisterObj);
      localStorage.setItem("Angular18", JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.UserRegisterObj);
      localStorage.setItem("Angular18", JSON.stringify(localArray));
    }
    
    // Set success message and show alert
    this.successMessage = "User Register Successful!";
    this.showAlert = true;

    // Redirect to Login page after a delay (optional)
    setTimeout(() => {
      this.router.navigateByUrl('Login');
    }, 2000); // 2 seconds delay
  }
}
