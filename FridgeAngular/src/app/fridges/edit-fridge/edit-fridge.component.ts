import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-fridge',
  templateUrl: './edit-fridge.component.html',
  styleUrls: ['./edit-fridge.component.scss']
})
export class EditFridgeComponent implements OnInit {
  fridgeForm!: FormGroup
  listModel$!: Observable<any[]>;
  submitted = false;
  id!: number;
  @Input() fridge:any;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.fridge.id;
    this.createFridgeForm();
    this.listModel$ = this.fridgeService.listModels();
  }

  // Create a new fridge form
  createFridgeForm() {
    this.fridgeForm = this.formBuilder.group({
      manufacturer:[this.fridge.manufacturer, Validators.required],
      ownerName:[this.fridge.ownerName, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      modelId:[this.fridge.modelId, [Validators.required]]
    })
    console.log("Fridge form successfully created");
  }

  // Submitting the form
  onSubmit() {
    this.submitted = true;
    if (this.fridgeForm.invalid) {  
      return 
    }
    console.log(this.fridgeForm.value);
    console.log("Submitted");
    this.updateFridge();
  }

  // Update fridge  
  updateFridge() {
    var fridge = {
      id: this.id,
      manufacturer: this.fridgeForm.value.manufacturer,
      ownerName: this.fridgeForm.value.ownerName,
      modelId: this.fridgeForm.value.modelId
    }

    this.fridgeService.updateFridge(this.id, fridge).subscribe(data => {
      var closeModalBtn = document.getElementById('update-fridge-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`Fridge with id ${this.id} successfully updated`);
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
}
