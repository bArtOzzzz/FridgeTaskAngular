import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  listProducts: any=[];
  product: any;
  productName: any;
  pages: number = 1;
  activateModalComponent: boolean = false;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  // Searching the product
  Search() {
    if (this.productName == '') {
      this.ngOnInit();
    }
    else {
      this.listProducts = this.listProducts.filter((res: { productName: string; }) => {
        return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
      })
    }
  }

  // Get products
  getProductList() {
    this.fridgeService.listProducts().subscribe(data => {
      this.listProducts = data;
      console.log("Recount products");
    })
  }

  // onClick for update button
  modalUpdateOpen(product: any) {
    this.product = product;
    this.activateModalComponent = true;
    console.log("Modal window open");
  }

  // onClick for close/cancel button
  modalClose() {
    this.activateModalComponent = false;
    this.getProductList();
    console.log("Page updated and modal closed");
  }

  // Delete model
  deleteProduct(productId: string) {
    if(confirm(`Are you sure you want to delete this product`)) {
      this.fridgeService.deleteProduct(productId).subscribe(ref => {
        this.modalClose();
        var showCreateSuccess = document.getElementById('delete-success-alert');
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
