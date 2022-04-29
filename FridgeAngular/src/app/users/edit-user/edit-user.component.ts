import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user:any;
  userForm!: FormGroup;
  id!: string;
  submitted = false;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.user.id;
    this.createUserForm();
  }

  // Create user form
  createUserForm() {
    this.userForm = this.formBuilder.group({
      userName:[this.user.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      gmail:[this.user.gmail, [Validators.required, Validators.email]],
      password:[this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(24)]]
    })
    console.log("Model form successfully created");
  }

  updateUser() {
    var user = {
      id: this.id,
      userName: this.userForm.value.userName,
      gmail: this.userForm.value.gmail,
      password: this.userForm.value.password
    }

    this.fridgeService.updateUser(this.id, user).subscribe(ref => {
      var closeModalBtn = document.getElementById('update-user-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`User with id ${this.id} successfully updated`);
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
        console.log("Showing success alert");
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.userForm.valid && this.submitted) {
      this.updateUser();
    }
  }
}
