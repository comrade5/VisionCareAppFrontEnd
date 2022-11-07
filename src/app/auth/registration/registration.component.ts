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

  isNotMatchingPassword: boolean = false;
  currentUserForm: UserModel = {
    email: '',
    password: '',
    matchingPassword: ''
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if(this.currentUserForm.password !== this.currentUserForm.matchingPassword) {
      this.isNotMatchingPassword = true;
      return;
    } else {
      this.isNotMatchingPassword = false;
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
