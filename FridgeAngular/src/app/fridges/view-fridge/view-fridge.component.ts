import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  createFridgeProductForm: FormGroup = new FormGroup({});

  constructor(private fridgeService: FridgeService,
              private activatedRoute: ActivatedRoute,
              private formBulder: FormBuilder) { }

  ngOnInit(): void {
  this.getFridgeId();
  this.fridgeDetails$ = this.fridgeService.viewFridge(this.fridgeId);
  this.countOfProducts();
  this.createProductForm();
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

  // Create new fridge product form
  createProductForm(){
    this.createFridgeProductForm = this.formBulder.group({
      'productName': new FormControl(''),
      'defaultQuantity': new FormControl('')
    })
  }

  // Create new product by fridge id
  createFridgeProduct() {
    this.fridgeService.createProduct(this.fridgeId, this.createFridgeProductForm.value).subscribe(data => {
      console.log("Product created successfully!")
    }, err => {
      console.log(err);
    })
  }
}
