import {Inject, Injectable} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Activity, ApiActivity} from "../../models/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  ACTIVITY_PATH = '';

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient,
              private userService: UserService) {

    this.ACTIVITY_PATH = this.config.activityServiceApiEndpoint+'/activities';
  }

  getAllUserActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/'+this.userService.getUserId());
  }

  takeUserBreak() {
    return this.http.get(this.ACTIVITY_PATH+'/break/'+this.userService.getUserId());
  }

  getUserTodayActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/today/'+this.userService.getUserId());
  }

  getUserWeekActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/week/'+this.userService.getUserId());
  }

  getUserMonthActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/month/'+this.userService.getUserId());
  }
}
