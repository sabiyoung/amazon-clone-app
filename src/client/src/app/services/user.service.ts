import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User} from './../../../../shared/models/user.model'
import { map } from 'rxjs/operators';
import { Product } from '../../../../shared/models/products.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
  ) { }

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map((res) => res.data));
  }
  createUser(user: User) {
    return this.api
      .post<{ data: User }>('create-user', user)
      .pipe(map((res) => res.data));
  }
  deleteUser(user: User) {
    return this.api
      .delete<{ data: User }>('delete-user/' + user._id)
      .pipe(map((res) => res.data));
  }
}
