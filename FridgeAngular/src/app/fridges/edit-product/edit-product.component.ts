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
  id!: number;

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.product.id;
    this.createProductForm();
  }

  // Create new product form
  createProductForm() {
    this.productUpdateForm = this.formBuilder.group({
      productName:['', Validators.required],
      defaultQuantity:['', [Validators.required, Validators.maxLength(3)]],
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
      id: this.id,
      productName: this.productUpdateForm.value.productName,
      defaultQuantity: this.productUpdateForm.value.defaultQuantity,
    }

    this.fridgeService.updateProduct(this.id, product).subscribe(data => {
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
}
