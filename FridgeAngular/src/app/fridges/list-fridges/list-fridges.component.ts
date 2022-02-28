import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-fridges',
  templateUrl: './list-fridges.component.html',
  styleUrls: ['./list-fridges.component.scss']
})
export class ListFridgesComponent implements OnInit {
  createFridgeForm:FormGroup = new FormGroup({});

  listFridges$!: Observable<any[]>;
  listModel$!: Observable<any[]>;

  countFridges:any=[]
  listModel:any=[]

  // Map to display data associate with foreign keys
  fridgeModelNameMap:Map<number, string> = new Map();
  fridgeModelProductionYearMap:Map<number, string> = new Map();

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listFridges$ = this.fridgeService.listFridges();

    this.listModel$ = this.fridgeService.listModels();
    this.listModel = this.fridgeService.listModels();

    this.createFridgeForm = this.formBuilder.group({
      'manufacturer': new FormControl(''),
      'ownerName': new FormControl(''),
      'modelId': new FormControl('')
    })

    this.refreshFridgeModelNameMap();
    this.refreshFridgeModelProductionYearMap();
    this.countOfFridges();
  }

  // Variables (properties)
  activateModalComponent: boolean = false;

  // Counting the length of fridges
  countOfFridges() {
    this.fridgeService.listFridges().subscribe(data => {
      this.countFridges = data;
    })
  }

  // Get fridge model by id
  refreshFridgeModelNameMap() {
    this.fridgeService.listModels().subscribe(data => {
      this.listModel = data;

      for(let i = 0; i < data.length; i++) {
        this.fridgeModelNameMap.set(this.listModel[i].id, this.listModel[i].modelName);
      }
    })
  }

  // Get fridge production year by id
  refreshFridgeModelProductionYearMap() {
    this.fridgeService.listModels().subscribe(data => {
      this.listModel = data;

      for(let i = 0; i < data.length; i++) {
        this.fridgeModelProductionYearMap.set(this.listModel[i].id, this.listModel[i].productionYear);
      }
    })
  }

  // Create new fridge
  createFridge() {
    this.fridgeService.createFridge(this.listModel.id, this.createFridgeForm.value).subscribe(data => {
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

  modalOpen() {
    this.activateModalComponent = true;
    console.log("true");
  }

  modalClose() {
    this.activateModalComponent = false;
    this.listFridges$ = this.fridgeService.listFridges();
    console.log("false");
  }
}
