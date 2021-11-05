import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loadProducts, selectProductAction } from './../../store/actions/product/product.actions';
import { Product } from './../../../../../shared/models/products.model';
import { Observable } from 'rxjs';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.products$ = this.store.select(productsSelector)
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }
productDetail(selectedProduct: Product) {
  this.store.dispatch(selectProductAction({data:selectedProduct}))
  this.router.navigate(['/product-detail'])
}

ratingArray(arr:any) {
const newArray = Array.from({length:arr}, (_, index) => index + 1)
return newArray;
}

}
