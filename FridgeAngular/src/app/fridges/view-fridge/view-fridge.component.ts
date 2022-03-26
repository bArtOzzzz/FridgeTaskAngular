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

  listProducts$!: Observable<any[]>;
  listProducts: any=[]
  product: any;

  activateModalComponent: boolean = false;

  constructor(private fridgeService: FridgeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFridgeId();
    this.productsCount();
  
    this.listProducts$ = this.fridgeService.viewFridge(this.fridgeId);
  }

  // Get products
  productsCount() {
    this.fridgeService.viewFridge(this.fridgeId).subscribe(data => {
      this.listProducts = data;
    })
  }

  modalCreateOpen() {
    this.product = {
      id: null,
      productName: null,
      defaultQuantity: null,
    }
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  modalUpdateOpen(product: any) {
    this.product = product;
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  modalClose() {
    this.listProducts$ = this.fridgeService.viewFridge(this.fridgeId);
    this.activateModalComponent = false;
    this.productsCount();
    console.log("Page updated and modal closed");
  }

  // Get fridge id from activatedRoute
  getFridgeId() {
    this.activatedRoute.params.subscribe(data => {
      this.fridgeId = data['id'];
      console.log("Get fridge id");
    })
  }
  
  // Delete the product
  deleteProduct(product: any) {
    if(confirm(`Are your sure you want to delete this product?`)) {
      this.fridgeService.deleteProduct(product.id).subscribe(data => {
        console.log("Product deleted successfully");
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
        this.productsCount();
      })
    }
    else {
      console.log("Product delete cancelled");
    }
  }
}
