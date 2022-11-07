import {Inject, Injectable} from '@angular/core';
import {StorageService} from "../../storage/storage.service";
import {Observable} from "rxjs";
import {Settings, UserModel} from "../../models/interfaces";
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_CONFIG_API_PATH = '';

  constructor(private localStore: StorageService,
              @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient,) {
    this.USER_CONFIG_API_PATH = this.config.userServiceApiEndpoint.concat('/config/');
  }

  registerUser(userModel: UserModel) {

    this.http.post<string>(this.config.userServiceApiEndpoint+'/register', userModel, { responseType: 'text' as 'json'})
      .subscribe((data: string) => this.saveUserId(data));
  }

  loginUser(userModel: UserModel) : Observable<string> {
    return this.http.post<string>(this.config.userServiceApiEndpoint+'/check', userModel, { responseType: 'text' as 'json'});
  }

  isLoggedIn() {
    return this.getUserId() !== '';
  }

  saveUserId(userId: string) : void {
    this.localStore.saveData('id', userId);
  }

  private removeUserId() {
    this.localStore.removeData('id');
  }

  getUserId() : string {
    return this.localStore.getData('id');
  }

  saveUserConfig(userSettings: Settings) {
    this.localStore.saveData('userConfig', JSON.stringify(userSettings));
  }

  private removeUserConfig() {
    this.localStore.removeData('userConfig');
  }

  sendUserConfig(userSettings: Settings) {
    this.http.put<string>(this.USER_CONFIG_API_PATH.concat(this.getUserId()), userSettings, { responseType: 'text' as 'json'})
      .subscribe(() => {
        this.saveUserConfig(userSettings);
      })
  }

  getUserConfig() : Observable<Settings> {
    if(this.localStore.getData('userConfig') !== '') {
      return new Observable<Settings>((subscriber) => {
        subscriber.next(JSON.parse(this.localStore.getData('userConfig')));
      });
    } else {
      return this.http.get<Settings>(this.USER_CONFIG_API_PATH.concat(this.getUserId()));
    }
  }

  logoutUser() {
    this.removeUserId();
    this.removeUserConfig();
  }
}
