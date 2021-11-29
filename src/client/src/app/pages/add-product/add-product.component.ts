import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { createProducts } from 'src/app/store/actions/product/product.actions';
import { Product } from './../../../../../shared/models/products.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProduct: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    this.addProduct = this.fb.group({
      price: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      title: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      image: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  ngOnInit(): void {}
  addProducts() {
    this.store.dispatch(createProducts({ data: this.addProduct.value }));
    console.log({ data: this.addProduct.value });
    this.addProduct.reset();
  }
}
