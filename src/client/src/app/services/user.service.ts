import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './../../../../shared/models/user.model';
import { map } from 'rxjs/operators';
import { Adress } from '../../../../shared/models/adress.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUserId = '';
  constructor(private api: ApiService, private router: Router) {}

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map((res) => res.data));
  }
  createUser(user: User) {
    return this.api
      .post<{ data: User }>('create-user', user)
      .pipe(map((res) => res.data));
  }
  login(user: User) {
    return this.api.post<{ data: User }>('login', user);
  }
  loginNavigate() {
    return of(this.router.navigate(['/']));
  }
  deleteUser(user: User) {
    return this.api
      .delete<{ data: User }>('delete-user/' + user._id)
      .pipe(map((res) => res.data));
  }

  logout() {
    this.router.navigate(['/sign-in']);
    return this.api.get('logout');
  }
  selectUser(id: string) {
    this.selectedUserId = id;
  }
  getAdress() {
    return this.api
      .get<{ data: Adress[] }>('adress')
      .pipe(map((res) => res.data));
  }
  createAdress(adress: Adress) {
    return this.api
      .post<{ data: Adress }>('create-adress', adress)
      .pipe(map((res) => res.data));
  }
}
