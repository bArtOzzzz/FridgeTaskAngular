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
  listModel$!: Observable<any[]>;

  countFridges:any=[]
  listModel:any=[]

  // Map to display data associate with foreign keys
  fridgeModelNameMap:Map<number, string> = new Map();
  fridgeModelProductionYearMap:Map<number, string> = new Map();

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.listFridges$ = this.fridgeService.listFridges();
    this.listModel$ = this.fridgeService.listModels();

    this.refreshFridgeModelNameMap();
    this.refreshFridgeModelProductionYearMap();
    this.countOfFridges();
  }

  // Counting the length of fridges
  countOfFridges() {
    this.fridgeService.listModels().subscribe(data => {
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
}
