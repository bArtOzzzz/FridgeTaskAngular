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

  listProducts: any

  createFridgeProductForm: FormGroup = new FormGroup({});

  constructor(private fridgeService: FridgeService,
              private activatedRoute: ActivatedRoute,
              private formBulder: FormBuilder) { }

  ngOnInit(): void {
    this.getFridgeId();
  
    this.fridgeDetails$ = this.fridgeService.viewFridge(this.fridgeId);
    this.listProducts = this.fridgeService.listProducts();

    this.createProductForm();
  }

  // Get fridge id from activatedRoute
  getFridgeId() {
    this.activatedRoute.params.subscribe(data => {
      this.fridgeId = data['id'];
      console.log("Get fridge id");
    })
  }

  // Create new fridge product form
  createProductForm(){
    this.createFridgeProductForm = this.formBulder.group({
      'productName': new FormControl(''),
      'defaultQuantity': new FormControl('')
    })
    console.log("Product form was created");
  }

  // Create new product by fridge id
  createFridgeProduct() {
    this.fridgeService.createProduct(this.fridgeId, this.createFridgeProductForm.value).subscribe(data => {
      console.log("Product created successfully!")
    }, err => {
      console.log(err);
    })
    console.log("Product was created");
    
    var closeModalBtn = document.getElementById('view-fridge-modal-close');
    if (closeModalBtn) {
      closeModalBtn.click();
    }
  }

  // Delete the product
  deleteProduct(productId: string) {
    if(confirm(`Are your sure you want to delete this product?`)) {
      this.fridgeService.deleteProduct(productId).subscribe(data => {
        console.log("Product was delete successfully!")
      }, err => {
        console.log("Unable to Delete the product")
      })
    }
  }

  // Close the modal
  modalClose() {
    console.log("Modal was closed {Create new product}");

    var showAddSuccess = document.getElementById('add-success-alert');
    if(showAddSuccess) {
      showAddSuccess.style.display = "block";
      console.log("Start 'product create' alert");
    }
    setTimeout(function() {
      if(showAddSuccess) {
        showAddSuccess.style.display = "none"
        console.log("Stop show 'product create' alert");
      }
    }, 4000);
  }
}

