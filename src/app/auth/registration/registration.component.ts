import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/interfaces";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userError: string = '';
  currentUserForm: UserModel = {
    email: '',
    password: '',
    matchingPassword: ''
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.userError = '';
    if(this.currentUserForm.email === '' ||
        this.currentUserForm.password === '' ||
          this.currentUserForm.matchingPassword === '') {
      this.currentUserForm.email === ''
        ? this.userError = 'EMPTY_EMAIL'
        : this.currentUserForm.password === '' ? this.userError = "EMPTY_PASSWORD"
                                                : this.userError = "EMPTY_MATCHING_PASSWORD";
      return;
    }

    if(this.currentUserForm.password != this.currentUserForm.matchingPassword) {
      this.userError = "NON_MATCHING_PASSWORDS";
      return;
    }

    this.userService.registerUser(this.currentUserForm);

    this.currentUserForm = {
      email: '',
      password: '',
      matchingPassword: ''
    };

    this.router.navigate(['/main']);

  }
}
