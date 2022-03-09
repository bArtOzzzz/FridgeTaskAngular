import { Component, Input, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private fridgeService: FridgeService) { }

  @Input() product:any;
  id!: number;
  productName: string = "";
  defaultQuantity: number = 0;

  ngOnInit(): void {
    this.id = this.product.id;
    this.productName = this.product.productName;
    this.defaultQuantity = this.product.defaultQuantity;
  }

  // Update fridge  
  updateProduct() {
    var product = {
      id: this.id,
      productName: this.productName,
      defaultQuantity: this.defaultQuantity,
    }

    var productId: number = this.id;
    this.fridgeService.updateProduct(productId, product).subscribe(data => {
      var closeModalBtn = document.getElementById('update-product-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`Product with id ${productId} successfully updated`);
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
        console.log("Showing success alert");
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    })
  }
}
