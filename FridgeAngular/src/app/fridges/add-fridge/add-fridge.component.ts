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

  modelList$!: Observable<any[]>;
  model: any;

  createFridgeForm:FormGroup = new FormGroup({});

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.model = this.fridgeService.listModels();
    this.modelList$ = this.fridgeService.listModels();

    this.createFridgeForm = this.formBuilder.group({
      'manufacturer': new FormControl(''),
      'ownerName': new FormControl(''),
      'modelId': new FormControl('')
    })
  }

  // Create new fridge
  createFridge(modelId: string) {
    this.fridgeService.createFridge(modelId, this.createFridgeForm.value).subscribe(data => {
      var closeModalBtn = document.getElementById('list-fridges-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      // var showAddSuccess = document.getElementById('add-success-alert');
      // if(showAddSuccess) {
      //   showAddSuccess.style.display = "block";
      // }
      // setTimeout(function() {
      //   if(showAddSuccess) {
      //     showAddSuccess.style.display = "none"
      //   }
      // }, 4000);
    })
  }

}
