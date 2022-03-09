import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {
  listModel$!: Observable<any[]>;
  listFridges: any=[]

  constructor(private fridgeService: FridgeService) { }

  @Input() fridge:any;
  manufacturer:string = "";
  ownerName:string = "";
  modelId!:number;

  ngOnInit(): void {
    this.manufacturer = this.fridge.manufacturer;
    this.ownerName = this.fridge.ownerName;
    this.modelId = this.fridge.modelId;
    this.listModel$ = this.fridgeService.listModels();
  }

  // Get fridges
  fridgeCount() {
    this.fridgeService.listFridges().subscribe(data => {
      this.listFridges = data;
    })
  }

  // Create fridge  
  createFridge() {
    var fridge = {
      manufacturer: this.manufacturer,
      ownerName: this.ownerName,
      modelId: this.modelId
    }
    this.fridgeService.createFridge(fridge).subscribe(data => {
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
