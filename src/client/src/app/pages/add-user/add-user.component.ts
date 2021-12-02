import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createUser } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUser: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>, private router:Router) {
    this.addUser = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required]),
      ],
      username: [
        '',
        Validators.compose([Validators.required]),
      ],
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
  addUsers() {
    this.store.dispatch(createUser({ data: this.addUser.value }));
    console.log({ data: this.addUser.value });
    this.addUser.reset();
  }
   // pattern('/^([a-zA-Z\d\.-]+)@([a-z\d-]+)\.([a-z{2,8}])(.\[a-z]{2,8})?$/')
   
get email() {
  return this.addUser.get('email');
} 
get name() {
  return this.addUser.get('name')
} 
get username() {
  return this.addUser.get('username')
} 
get password () {
  return this.addUser.get('password')
} 
login() {
  this.router.navigate(['sign-in'])
}
}
