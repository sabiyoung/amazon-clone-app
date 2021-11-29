import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  loadProducts,
  loadRating,
  selectProductAction,
} from './../../store/actions/product/product.actions';
import { Product } from './../../../../../shared/models/products.model';
import { Observable } from 'rxjs';
import {
  productsSelector,
  ratingSelector,
} from 'src/app/store/selectors/product/product.selectors';
import { Router } from '@angular/router';
import { Rating } from '../../../../../shared/models/rating.model';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  rating$: Observable<Rating[]>;
  public filterCategory: any;
  public product:any
  searchkey: string = "";

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
    this.products$ = this.store.select(productsSelector);
    this.rating$ = this.store.select(ratingSelector);
  
  };

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadRating());
    this.productService.getProducts().subscribe((res) => {
      this.product = res;
    this.filterCategory = res;
    })
    this.productService.search.subscribe((val: any) => {
      this.searchkey = val;
    })
  }
  productDetail(selectedProduct: Product) {
    this.store.dispatch(selectProductAction({ data: selectedProduct }));
    this.router.navigate(['/product-detail']);
  }

  goToReviews() {
    this.router.navigate(['/rating']);
  }
  filter(category: string) {
    this.filterCategory = this.product
      .filter((product: any) => {
        if (product.category == category || category == '') {
          return product;
        }
      })
  }

}
