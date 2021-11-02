import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadUsers } from 'src/app/store/actions/user/user.actions';
import { usersSelector } from 'src/app/store/selectors/product/product.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
users$: Observable<User[]>
  constructor(
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(usersSelector)
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
  }

}
