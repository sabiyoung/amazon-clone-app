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
  public product = new BehaviorSubject<any>([])
  public search = new BehaviorSubject<string>("");

  public products: Product[] = [];
  products$: Observable<Product[]>;


  constructor(private api: ApiService, private store: Store<AppState>) {
    this.products$ = this.store.select(productsSelector);

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
  filter(title: string) {
    return this.products$.subscribe(product => product.filter((product) => product.title.includes(title)))

  }


}
