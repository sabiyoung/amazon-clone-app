import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { getTotalSuccess } from 'src/app/store/actions/product/product.actions';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.scss']
})
export class SubtotalComponent implements OnInit {
  products$: Observable<Product[]>;
products: Product[] = []
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
    this.products$ = this.store.select(addToCartSelector)
  }

  ngOnInit(): void {
 
  }
 
getAmount() {
  let totalAmount = 0
  this.products$.subscribe(products => this.products = products)
  this.products.forEach(product => {
    (product.price * product.quantity)
totalAmount += product.price
  })
  return totalAmount
}
checkout() {
  this.router.navigate(['/checkout'])
}
}
