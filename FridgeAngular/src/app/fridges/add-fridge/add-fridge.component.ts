import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {
  fridgeForm!: FormGroup
  modelForm!: FormGroup
  submitted = false;
  isModelChecked = false;

  listModel$!: Observable<any[]>;
  newModel:any=[]
  tempRepository: any;
  modelId: string = '';

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFridgeForm();
    this.listModel$ = this.fridgeService.listModels();
  }

  // Create fridge form
  createFridgeForm() {
    this.fridgeForm = this.formBuilder.group({
      manufacturer:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      ownerName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      modelId:['', Validators.required]
    })
    console.log("Fridge form successfully created");
  }

  activeModelForm() {
    if(this.isModelChecked) {
      this.isModelChecked = false;
    }
    else {
      this.isModelChecked = true;
    }
    this.createModelForm();
    console.log("Model form activated");
    console.log(this.isModelChecked);
  }

  // Create model form
  createModelForm() {
    this.modelForm = this.formBuilder.group({
      modelName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      productionYear:['', Validators.required]
    })
    console.log("Model form successfully created");
  }

  // Submitting the form
  onSubmit() {
    this.submitted = true;

    if (this.fridgeForm.invalid) {  
      console.log("Invalid");
      return 
    }
    this.createFridge();
  }

  // Create fridge  
  createFridge() {
    if(this.isModelChecked) {
      this.fridgeService.createModel(this.modelForm.value).subscribe(data => {
        this.fridgeService.listModels().subscribe(data => {
          this.newModel = data;
          console.log(this.modelForm.value)
          console.log(this.newModel);
    
          for(let i = 0; i < data.length; i++) {
            if(this.modelForm.value.modelName == this.newModel[i].modelName) {
              this.tempRepository = this.newModel[i];
              console.log(this.tempRepository);
              this.fridgeForm.value.modelId = this.tempRepository.id;
              console.log(this.fridgeForm.value);
              this.fridgeService.createFridge(this.fridgeForm.value).subscribe(data => {
                var closeModalBtn = document.getElementById('create-fridge-modal-close');
                if (closeModalBtn) {
                  closeModalBtn.click();
                  console.log("Fridge successfully created");
                }

                var showCreateSuccess = document.getElementById('create-success-alert');
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
        })
      })
    }
    else {
        this.fridgeService.createFridge(this.fridgeForm.value).subscribe(data => {
        var closeModalBtn = document.getElementById('create-fridge-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
          console.log("Fridge successfully created");
        }

        var showCreateSuccess = document.getElementById('create-success-alert');
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
}
