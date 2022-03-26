import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {
  modelForm!: FormGroup;

  id!: number;
  @Input() model:any;

  submitted = false;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.model.id;
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

  updateModel() {
    var model = {
      id: this.id,
      modelName: this.modelForm.value.modelName,
      productionYear: this.modelForm.value.productionYear,
    }

    this.fridgeService.updateModel(this.id, model).subscribe(ref => {
      var closeModalBtn = document.getElementById('update-model-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`Model with id ${this.id} successfully updated`);
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
    if(this.modelForm.valid && this.submitted) {
      this.updateModel();
    }
  }
}
