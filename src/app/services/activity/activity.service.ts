import {Inject, Injectable} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Activity, ApiActivity} from "../../models/interfaces";
import {catchError, map, Observable, reduce, throwError} from "rxjs";

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
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/all/'+this.userService.getUserId()).pipe(
      catchError(err => {
        throw throwError(err);
      }));
  }

  takeUserBreak() {
    return this.http.get(this.ACTIVITY_PATH+'/break/'+this.userService.getUserId(), { responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        console.log(err);
      throw throwError(err);
    }));
  }

  getUserTodayActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/today/'+this.userService.getUserId()).pipe(
      catchError(err => {
        throw throwError(err);
      }));
  }

  getUserWeekActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/week/'+this.userService.getUserId()).pipe(
      catchError(err => {
        throw throwError(err);
      }));
  }

  getUserMonthActivities() : Observable<ApiActivity[]> {
    return this.http.get<ApiActivity[]>(this.ACTIVITY_PATH+'/month/'+this.userService.getUserId()).pipe(
      catchError(err => {
        throw throwError(err);
      }));
  }
}
