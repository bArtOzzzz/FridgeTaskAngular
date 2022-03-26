import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.scss']
})
export class ListModelsComponent implements OnInit {
  listModels$!: Observable<any[]>;
  listModels: any=[];
  listFridges: any=[];
  listModelsToDelete: any=[];
  model: any;

  listModelsId: any=[];

  activateModalComponent: boolean = false;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.listModels$ = this.fridgeService.listModels();

    this.modelCount();
    this.fridgesCount();
  }

  // Get models
  modelCount() {
    this.fridgeService.listModels().subscribe(data => {
      this.listModels = data;
      for(let i = 0; i < data.length; i++) {
        this.listModelsId[i] = this.listModels[i].id;
      }
      console.log("Recount models");
    })
  }

  // Get fridges
  fridgesCount() {
    this.fridgeService.listFridges().subscribe(data => {
      this.listFridges = data;
      console.log("Getting list of fridges");
    })
  }

  // onClick for close/cancel button
  modalClose() {
    this.activateModalComponent = false;
    this.listModels$ = this.fridgeService.listModels();
    this.modelCount();
    console.log("Page updated and modal closed");
  }

  // onClick for update button
  modalUpdateOpen(model: any) {
    this.model = model;
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  // Delete model
  deleteModel(modelId: string) {
    for(let i = 0; i < this.listFridges.length; i++) {
      if(this.listFridges[i].modelId == modelId) {
        console.log("You can't delete this model");
        alert("Oops! It seems you can't delete this model!");
        return;
      }
    }
    if(confirm(`Are you sure you want to delete this model`)) {
      this.fridgeService.deleteModel(modelId).subscribe(ref => {
        this.modalClose();
        var closeModalBtn = document.getElementById('delete-model-modal-close');
        var showCreateSuccess = document.getElementById('delete-success-alert');
        if (closeModalBtn) {
          closeModalBtn.click();
          console.log("Model successfully deleted");
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
}
