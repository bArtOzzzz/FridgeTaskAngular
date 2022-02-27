import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-view-fridge',
  templateUrl: './view-fridge.component.html',
  styleUrls: ['./view-fridge.component.scss']
})
export class ViewFridgeComponent implements OnInit {

  fridgeId: string = '';
  fridgeDetails$!: Observable<any[]>;

  countProducts:any=[]

  constructor(private fridgeService: FridgeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.getFridgeId();
  this.fridgeDetails$ = this.fridgeService.viewFridge(this.fridgeId);
  this.countOfProducts();
  }

  // Get fridge id from activatedRoute
  getFridgeId() {
    this.activatedRoute.params.subscribe(data => {
      this.fridgeId = data['id'];
    })
  }

  // Counting the length of products into fridge by id
  countOfProducts() {
    this.fridgeService.viewFridge(this.fridgeId).subscribe(data => {
      this.countProducts = data;
    })
  }
}
