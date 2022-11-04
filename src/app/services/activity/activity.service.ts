import {Inject, Injectable} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {ApiActivity} from "../../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient,
              private userService: UserService) { }

  getAllUserActivities() {
    this.http.get<ApiActivity[]>(this.config.activityServiceApiEndpoint+"/activities/add")
      .subscribe( data => console.log(data));
  }
}
