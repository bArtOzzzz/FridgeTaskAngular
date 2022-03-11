import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  fridgeId: string = "";
  productForm!: FormGroup
  submitted = false;

  constructor(private fridgeService: FridgeService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getFridgeId();
    this.createProductForm();
  }

  // Create product form
  createProductForm() {
    this.productForm = this.formBuilder.group({
      productName:['', Validators.required],
      defaultQuantity:['', [Validators.required, Validators.maxLength(3)]],
    })
    console.log("Product form successfully created");
  }

  // Submitting the form
  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {  
      return 
    }
    console.log(this.productForm.value);
    this.createProduct();
  }

  // Getting fridge id onInit
  getFridgeId() {
    this.activatedRoute.params.subscribe(data => {
      this.fridgeId = data['id'];
      console.log("Get fridge id");
    })
  }

  // Create product
  createProduct() {
    this.fridgeService.createProduct(this.fridgeId, this.productForm.value).subscribe(data => {
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
