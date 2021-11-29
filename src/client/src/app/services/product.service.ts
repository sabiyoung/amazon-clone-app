import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/products.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Rating } from './../../../../shared/models/rating.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from './../store/index';
import { Store } from '@ngrx/store';
import { productsSelector } from '../store/selectors/product/product.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProductId = '';
  getCartTotal: Product[] = [];
  public products: Product[] = [];
  products$: Observable<Product[]>;
  filteredProducts: any;
  public search = new BehaviorSubject<string>('');

  constructor(private api: ApiService, private store: Store<AppState>) {
    this.products$ = this.store.select(productsSelector);
    this.filterProduct();
    console.log(this.products$);
  }

  createProduct(product: Product) {
    console.log(product);
    return this.api
      .post<{ data: Product }>('create-product', product)
      .pipe(map((res) => res.data));
  }
  createRating(rating: Rating) {
    return this.api
      .post<{ data: Rating }>('create-rating', rating)
      .pipe(map((res) => res.data));
  }
  getProducts() {
    return this.api
      .get<{ data: Product[] }>('products')
      .pipe(map((res) => res.data));
  }
  getRatings() {
    return this.api
      .get<{ data: Rating[] }>('rating')
      .pipe(map((res) => res.data));
  }
  selectProduct(id: string) {
    this.selectedProductId = id;
  }

  filterProduct(search?: string): any {
    if (!search) {
      this.filteredProducts = this.products$;
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
}
