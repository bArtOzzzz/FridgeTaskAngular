import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {

  modelList$!: Observable<any[]>;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.modelList$ = this.fridgeService.listModels();
  }

  createFridge() {
    
  }

}
