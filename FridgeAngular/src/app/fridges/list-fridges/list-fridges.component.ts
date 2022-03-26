import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-fridges',
  templateUrl: './list-fridges.component.html',
  styleUrls: ['./list-fridges.component.scss']
})
export class ListFridgesComponent implements OnInit {
  listFridges$!: Observable<any[]>;
  listProducts$!: Observable<any[]>;
  listFridges: any=[]
  listModel:any=[]
  modalTitle: string = '';
  activateModalComponent: boolean = false;
  fridge: any;

  // Map to display data associate with foreign keys
  fridgeModelNameMap:Map<number, string> = new Map();
  fridgeModelProductionYearMap:Map<number, string> = new Map();

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.listFridges$ = this.fridgeService.listFridges();
    this.listProducts$ = this.fridgeService.listProducts();

    this.fridgeCount();
    this.refreshFridgeModelNameMap();
    this.refreshFridgeModelProductionYearMap();
  }

  // Get fridges
  fridgeCount() {
    this.fridgeService.listFridges().subscribe(data => {
      this.listFridges = data;
      console.log("Recount fridges");
    })
  }

  // onClick for create button
  modalCreateOpen() {
    this.fridge = {
      id: null,
      manufacturer: "",
      ownerName: "",
      modelId: null
    }
    this.modalTitle = "Create new fridge";
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  // onClick for update button
  modalUpdateOpen(fridge: any) {
    this.fridge = fridge;
    this.modalTitle = "Update fridge";
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  // onClick for close/cancel button
  modalClose() {
    this.activateModalComponent = false;
    this.listFridges$ = this.fridgeService.listFridges();
    this.refreshFridgeModelNameMap();
    this.refreshFridgeModelProductionYearMap();
    this.fridgeCount();
    console.log("Page updated and modal closed");
  }

  // Get fridge model by id
  refreshFridgeModelNameMap() {
    this.fridgeService.listModels().subscribe(data => {
      this.listModel = data;

      for(let i = 0; i < data.length; i++) {
        this.fridgeModelNameMap.set(this.listModel[i].id, this.listModel[i].modelName);
      }
      console.log("Get model name by id");
    })
  }

  // Get fridge production year by id
  refreshFridgeModelProductionYearMap() {
    this.fridgeService.listModels().subscribe(data => {
      this.listModel = data;

      for(let i = 0; i < data.length; i++) {
        this.fridgeModelProductionYearMap.set(this.listModel[i].id, this.listModel[i].productionYear);
      }
      console.log("Get model production year by id");
    })
  }

  //Delete the fridge
  deleteFridge(fridgeId: string) {
    if(confirm(`Are your sure you want to delete this fridge?`))  {
      this.fridgeService.deleteFridge(fridgeId).subscribe(data => {
        console.log("Fridge deleted successfully");
        this.modalClose();

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
          console.log("Showing success alert");
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.fridgeCount();
      })
    }
    else {
      console.log("Fridge delete cancelled");
    }
  }
}
