import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import {
  adressSelector,
  usersSelector,
} from 'src/app/store/selectors/user/user.selectors';
import { Adress } from '../../../../../shared/models/adress.model';
import { User } from '../../../../../shared/models/user.model';
import { loadAdress, loadUsers } from './../../store/actions/user/user.actions';

@Component({
  selector: 'app-adress-list',
  templateUrl: './adress-list.component.html',
  styleUrls: ['./adress-list.component.scss'],
})
export class AdressListComponent implements OnInit {
  adress$: Observable<Adress[]>;
  users$: Observable<User[]>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.adress$ = this.store.select(adressSelector);
    this.users$ = this.store.select(usersSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAdress());
    this.store.dispatch(loadUsers());
  }
  getDate() {
    const current = new Date();
    return current.toLocaleDateString();
  }
}
