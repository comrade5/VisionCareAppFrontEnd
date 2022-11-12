import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.userService.isLoggedIn();
  }

  logoutUser() {
    this.userService.logoutUser();
  }

  getRoute() {
    let capitalizeFirstLetter = (str: String) : String => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return capitalizeFirstLetter(this.router.url.substring(1));
  }
}


