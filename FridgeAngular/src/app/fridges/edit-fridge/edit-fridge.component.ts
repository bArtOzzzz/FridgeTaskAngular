import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-fridge',
  templateUrl: './edit-fridge.component.html',
  styleUrls: ['./edit-fridge.component.scss']
})
export class EditFridgeComponent implements OnInit {
  listModel$!: Observable<any[]>;

  constructor(private fridgeService: FridgeService, private activatedRoute: ActivatedRoute) { }

  @Input() fridge:any;
  id!: number;
  manufacturer:string = "";
  ownerName:string = "";
  modelId!:number;

  ngOnInit(): void {
    this.id = this.fridge.id;
    this.manufacturer = this.fridge.manufacturer;
    this.ownerName = this.fridge.ownerName;
    this.modelId = this.fridge.modelId;
    this.listModel$ = this.fridgeService.listModels();
  }

  // Update fridge  
  updateFridge() {
    var fridge = {
      id: this.id,
      manufacturer: this.manufacturer,
      ownerName: this.ownerName,
      modelId: this.modelId
    }

    var fridgeId: number = this.id;
    this.fridgeService.updateFridge(fridgeId, fridge).subscribe(data => {
      var closeModalBtn = document.getElementById('update-fridge-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`Fridge with id ${fridgeId} successfully updated`);
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
