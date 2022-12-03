import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userError: string = '';
  currentUserForm: UserModel = {
    email: '',
    password: '',
    matchingPassword: ''
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginFormSubmit() {
    this.userError = '';
    if(this.currentUserForm.email === '' ||
        this.currentUserForm.password === '') {
      this.currentUserForm.email === '' ? this.userError = 'EMPTY_EMAIL'
                                        : this.userError = 'EMPTY_PASSWORD';
      return;
    }
    this.userService.loginUser(this.currentUserForm).subscribe((data: string) => {
      switch (data) {
        case 'NOT_FOUND': this.userError = data; break;
        case 'BAD_CREDENTIALS': this.userError=data; break;
        default:
          this.userService.saveUserId(data);
          this.router.navigate(['/main']);
      }
    });

  }
}
