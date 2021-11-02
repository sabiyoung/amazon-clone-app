import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$: Observable<Product[]>;
  carts: Product []=[]

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
   this.cart$ = this.store.select(addToCartSelector)
  }

  ngOnInit(): void {

  }
cart() {
  this.router.navigate(['/cart'])
}
home() {
  this.router.navigate(['/'])
}

}
