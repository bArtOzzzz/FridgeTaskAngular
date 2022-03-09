import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  fridgeId: string = "";

  constructor(private fridgeService: FridgeService, private activatedRoute: ActivatedRoute) { }

  @Input() product:any;
  productName: string = "";
  defaultQuantity: number = 0;

  ngOnInit(): void {
    this.getFridgeId();

    this.productName = this.product.productName;
    this.defaultQuantity = this.product.defaultQuantity;
  }

  getFridgeId() {
    this.activatedRoute.params.subscribe(data => {
      this.fridgeId = data['id'];
      console.log("Get fridge id");
    })
  }

  // Create product
  createProduct() {
    var product = {
      productName: this.productName,
      defaultQuantity: this.defaultQuantity
    }
    this.fridgeService.createProduct(this.fridgeId, product).subscribe(data => {
      var closeModalBtn = document.getElementById('create-product-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log("Product successfully created");
      }

      var showCreateSuccess = document.getElementById('create-success-alert');
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
