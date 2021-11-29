import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { loadCart, updateCart } from 'src/app/store/actions/cart/cart.actions';
import {
  AddToCart,
  loadProducts,
} from 'src/app/store/actions/product/product.actions';
import { Cart } from '../../../../../shared/models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
    this.products$ = this.store.select(selectedProductSelector);
  }

  ngOnInit(): void {}
  addToCart(product: Product) {
    this.store.dispatch(updateCart({ data: product }));
  }

  isSelected(selectedProduct: Product, product: Product) {
    return selectedProduct?._id === product._id;
  }
  checkout(product: Product) {
    this.store.dispatch(updateCart({ data: product }));
    this.router.navigate(['checkout']);
  }
}
