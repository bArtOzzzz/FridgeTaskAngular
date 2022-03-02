import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {
  fridgeForm:FormGroup = new FormGroup({});

  listModel$!: Observable<any[]>;
  listModel:any

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listModel$ = this.fridgeService.listModels();
    this.listModel = this.fridgeService.listModels();

    this.createFridgeForm();
  }

  // Create fridge form
  createFridgeForm() {
    this.fridgeForm = this.formBuilder.group({
      'manufacturer': new FormControl(''),
      'ownerName': new FormControl(''),
      'modelId': new FormControl('')
    })
    console.log("Fridge form was created");
  }

  // Create fridge
  createFridge() {
    this.fridgeService.createFridge(this.listModel.id, this.fridgeForm.value).subscribe(data => {
      console.log("Fridge created")
    }, err => {
      console.log(err);
    })
    console.log("Fridge was created");

    var closeModalBtn = document.getElementById('add-fridge-modal-close');
    if (closeModalBtn) {
      closeModalBtn.click();
    }
  }
}
