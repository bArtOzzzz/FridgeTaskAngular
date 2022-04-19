import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isValid = false;
  submitted = false;
  
  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

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
    })
  }

  buttonCloseModal() {
    var closeModalBtn = document.getElementById('create-user-modal-close');
      var showCreateSuccess = document.getElementById('create-success-alert');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log("User successfully created");
      }
      if (showCreateSuccess) {
        showCreateSuccess.style.display = "block";
        console.log("Showing success alert");
      }
      setTimeout(function() {
        if(showCreateSuccess) {
          showCreateSuccess.style.display = "none";
        }
      }, 4000);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && this.registerForm.value.password == this.registerForm.value.passwordConfirmed) {
      this.isValid = true;
      this.createUser();
    }
    else {
      console.log("Please, check your password or email address");
    }
  }
}
