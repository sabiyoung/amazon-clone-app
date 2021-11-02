import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import {  selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { AddToCart } from 'src/app/store/actions/product/product.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.products$ = this.store.select(selectedProductSelector)

  }


  ngOnInit(): void {

  }
 addToCart(product: Product) {
  this.store.dispatch(AddToCart({data:product}))

 }
 isSelected(selectedProduct: Product , product: Product) {
  return selectedProduct?._id === product._id;
}

}
