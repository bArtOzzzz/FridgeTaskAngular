import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;

  id!: number;
  @Input() product:any;

  submitted = false;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.product.id;
    this.createProductForm();
  }

  // Create product form
  createProductForm() {
    this.productForm = this.formBuilder.group({
      productName:[this.product.productName, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      defaultQuantity:[this.product.defaultQuantity, Validators.required]
    })
    console.log("Model form successfully created");
  }

  updateProduct() {
    var product = {
      id: this.id,
      productName: this.productForm.value.productName,
      defaultQuantity: this.productForm.value.defaultQuantity
    }
    this.fridgeService.updateProduct(this.id, product).subscribe(ref => {
      var closeModalBtn = document.getElementById('update-product-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log(`Product with id ${this.id} successfully updated`);
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

  onSubmit() {
    this.submitted = true;
    if(this.productForm.valid && this.submitted) {
      this.updateProduct();
    }
  }
}
