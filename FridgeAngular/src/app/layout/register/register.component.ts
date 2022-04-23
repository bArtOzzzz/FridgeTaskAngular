import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  
  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.maxLength(24)],
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      passwordConfirmed: ['']
    })
    console.log("Registerer form successfully created");
  }

  createUser() {
    var user = {
      userName: this.registerForm.value.userName,
      gmail: this.registerForm.value.gmail,
      password: this.registerForm.value.password
    }
    this.fridgeService.createUser(user).subscribe(ref => {
      console.log("User successfully created");
      this.router.navigate(['/loginPage']);
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && this.registerForm.value.password == this.registerForm.value.passwordConfirmed) {
      this.createUser();
    }
    else {
      console.log("Please, check your password or email address");
    }
  }
}
