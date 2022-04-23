import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

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
    }
  }

  login() {
    this.fridgeService.login(this.loginForm.value).subscribe(ref => {
      console.log("User login succefffully");
      // this.router.navigate(['/']);
    })
  }
}
