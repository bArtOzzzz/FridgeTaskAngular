import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  modelForm!: FormGroup;

  submitted = false;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createModelForm();
  }

  // Create model form
  createModelForm() {
    this.modelForm = this.formBuilder.group({
      modelName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      productionYear:['', Validators.required]
    })
    console.log("Model form successfully created");
  }

  onSubmit() {
    this.submitted = true;

    if(this.submitted && this.modelForm.invalid) {
      console.log("Model Form is invalid");
      return;
    }

    this.createModel();
  }

  createModel() {
    this.fridgeService.createModel(this.modelForm.value).subscribe(ref => {
      console.log("New model successfully created");
      var closeModalBtn = document.getElementById('create-model-modal-close');
      var showCreateSuccess = document.getElementById('create-success-alert');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log("Model successfully created");
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
    })
  }
}
