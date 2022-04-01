import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productUpdateForm!: FormGroup
  submitted = false;
  @Input() product:any;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createProductForm();
  }

  // Create new product form
  createProductForm() {
    this.productUpdateForm = this.formBuilder.group({
      productName:[this.product.productName, Validators.required],
      defaultQuantity:[this.product.defaultQuantity, [Validators.required, Validators.maxLength(3)]],
      productImage: [this.product.productImage]
    })
    console.log("Product form successfully created");
  }

  // Submitting the form
  onSubmit() {
    this.submitted = true;
    if (this.productUpdateForm.invalid) {  
      return 
    }
    console.log(this.productUpdateForm.value);
    this.updateProduct();
  }

  // Update fridge  
  updateProduct() {
    var product = {
      id: this.product.id,
      productName: this.productUpdateForm.value.productName,
      defaultQuantity: this.productUpdateForm.value.defaultQuantity,
      productImage: this.productUpdateForm.value.productImage
    }
    this.fridgeService.updateProduct(this.product.id, product).subscribe(data => {
      console.log(`Product with id ${this.product.id} successfully updated`);
      var closeModalBtn = document.getElementById('update-product-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
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
