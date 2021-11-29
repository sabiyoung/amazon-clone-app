import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import {
  createRating,
  loadRating,
} from 'src/app/store/actions/product/product.actions';
import {
  productsSelector,
  ratingSelector,
} from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { Rating } from '../../../../../shared/models/rating.model';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
})
export class RatingListComponent implements OnInit {
  rating$: Observable<Rating[]>;
  addRating: FormGroup;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.rating$ = this.store.select(ratingSelector);
    this.addRating = this.fb.group({
      comment: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadRating());
  }
  addRatings() {
    this.store.dispatch(createRating({ data: this.addRating.value }));
    console.log({ data: this.addRating.value });
    this.addRating.reset();
  }
  // addRating(comment: string, product:Product) {
  //   // this.productService.createRating({comment, product }).subscribe()
  //   this.store.dispatch(createRating({ data: { comment: comment, product: product } }));
  // }
}
