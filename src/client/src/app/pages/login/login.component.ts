import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store';
import {
  loginUser,
  loginUserSuccess,
} from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  addUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.addUser = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    this.store.dispatch(loginUser({ data: this.addUser.value }));
  }
  signin() {
    this.router.navigate(['/add-user']);
  }
  get email() {
    return this.addUser.get('email');
  } 
  get password () {
    return this.addUser.get('password')
  } 
}
