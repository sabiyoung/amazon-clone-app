import { Injectable } from '@angular/core';
import {Product} from '../../../../shared/models/products.model'
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
selectedProductId = ''
getCartTotal: Product[] =[]
public cartItemList :Product[] =[]

  constructor(
    private api: ApiService
  ) { }

  createProduct(product: Product) {
    console.log(product)
    return this.api
      .post<{ data: Product }>('create-product', product)
      .pipe(map((res) => res.data));
  }

  getProducts() {
    return this.api.get<{ data: Product[] }>('products').pipe(map((res) => res.data));
  }

selectProduct(id: string) {
  this.selectedProductId = id;
}

deleteProduct(product: Product) {
  return this.api
    .delete<{ data: Product}>('delete-user/' + product._id)
    .pipe(map((res) => res.data));
}

getTotal() {
  this.getCartTotal.reduce((amount:any, item:any) =>  item.price + amount, 0);
  
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

}
