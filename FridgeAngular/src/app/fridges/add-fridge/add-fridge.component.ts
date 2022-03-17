import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {
  fridgeForm!: FormGroup;
  modelForm!: FormGroup;
  productForm!: FormGroup;

  submitted = false;
  isModelChecked = false;
  isProductChecked = false;

  listModel$!: Observable<any[]>;
  producFields: Array<any> = []
  listFridgeId: any=[]

  fridgeId: string = '';

  productData = {
    products: [
      {
        productName: '',
        defaultQuantity: ''
      }
    ]
  };

  constructor(private fridgeService: FridgeService, private formBuilder: FormBuilder) { 
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });

    this.setProducts();
  }

  get productsFormArr(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  addNewProduct() {
    this.productsFormArr.push(
      this.formBuilder.group({
        productName: [''],
        defaultQuantity: ['']
      })
    );
  }

  deleteProduct(index: any) {
    this.productsFormArr.removeAt(index);
  }

  setProducts() {
    this.productData.products.forEach(x => {
      this.productsFormArr.push(
        this.formBuilder.group({
          productName: x.productName,
          defaultQuantity: x.defaultQuantity
        })
      );
    });
  }

  ngOnInit(): void {
    this.getFridgesId();
    this.createFridgeForm();
    this.listModel$ = this.fridgeService.listModels();
  }

  //Get all fridges id
  getFridgesId() {
    this.fridgeService.listFridges().subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.listFridgeId[i] = data[i].id;
      }
    })
  }

  // Create fridge form
  createFridgeForm() {
    this.fridgeForm = this.formBuilder.group({
      manufacturer:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      ownerName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      modelId:['', Validators.required]
    })
    console.log("Fridge form successfully created");
  }

  // Create model form
  createModelForm() {
    this.modelForm = this.formBuilder.group({
      modelName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      productionYear:['', Validators.required]
    })
    console.log("Model form successfully created");
  }


  // Check for active model form
  activeModelForm() {
    if(this.isModelChecked) {
      this.isModelChecked = false;
    }
    else {
      this.isModelChecked = true;
    }
    this.createModelForm();
    console.log(`Model active state: ${this.isModelChecked}`);
  }

  activeProductFrom() {
    if(this.isProductChecked) {
      this.isProductChecked = false;
    }
    else {
      this.isProductChecked = true;
    }
    console.log(`Product active state: ${this.isProductChecked}`);
  }

  createFridge() {
    if(this.isModelChecked){
      this.createModel();
    }
    this.fridgeService.createFridge(this.fridgeForm.value).subscribe(ref => {
      var closeModalBtn = document.getElementById('create-fridge-modal-close');
      var showCreateSuccess = document.getElementById('create-success-alert');
      if (closeModalBtn) {
        closeModalBtn.click();
        console.log("Fridge successfully created");
      }
      if (showCreateSuccess) {
        showCreateSuccess.style.display = "block";
        console.log("Showing success alert");
      }
      setTimeout(function() {
        if(showCreateSuccess) {
          showCreateSuccess.style.display = "none";
        }
      }, 4000);
      if(this.isProductChecked) {
        this.createProduct();
      }
    })
  }

  createModel() {
    this.fridgeService.createModel(this.modelForm.value).subscribe(ref => {
      console.log("New model for fridge was created");
      this.fridgeService.listModels().subscribe(data => {
        for(let i = 0; i < data.length; i++) {
          if(this.modelForm.value.modelName == data[i].modelName) {
            this.fridgeForm.value.modelId = data[i].id;
            console.log("New model added to FridgeForm successfully");
          }
        }
      })
    })
  }

  createProduct() {
    this.fridgeService.listFridges().subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        if(data[i].id != this.listFridgeId[i]) {
          this.fridgeId = data[i].id;
          console.log("Fridge was define by id");
        }
      }
      for(let k = 0; k < this.productForm.value.products.length; k++) {
        this.fridgeService.createProduct(this.fridgeId, this.productForm.value.products[k]).subscribe(ref => {
          console.log("Product was added");
        })
      }
      console.log("All products was added successfully");
    })
  }

  // Submitting the form
  // TODO: FIX
  onSubmit() {
    this.submitted = true;
    this.createFridge();

    // if(this.fridgeForm.valid && !this.isModelChecked && !this.isProductChecked) {
    //   console.log("Valid");
    // }
    // else {
    //   console.log("Fridge Form is invalid");
    // }

    // if(this.modelForm && this.modelForm.valid && this.isModelChecked && !this.isProductChecked) {
    //   console.log("Valid");
    // }
    // else {
    //   console.log("Fridge Form is invalid");
    // }

    // if(this.fridgeForm.valid && this.productForm && this.productForm.valid && !this.isModelChecked && this.isProductChecked) {
    //   console.log("Valid");
    // }
    // else {
    //   console.log("Fridge Form is invalid");
    // }
  }
}
