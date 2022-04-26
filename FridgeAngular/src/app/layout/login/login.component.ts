import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder, 
              private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]]
    })
    console.log("Login form successfully created");
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.login();
    }
    else {
      console.log("Please, check your password or email address");
      return;
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      // console.log("User login succefffully");
      // console.log(this.loginForm.value);
      this.router.navigate(['/home']);
    })
  }
}
