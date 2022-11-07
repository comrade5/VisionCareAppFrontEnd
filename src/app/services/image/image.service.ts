import {Inject, Injectable} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";
// @ts-ignore
import {jic} from 'j-i-c'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient,
              private userService: UserService) {

  }

  sendImage(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<any>(this.config.imageServiceApiEndpoint+'/images/1', formData);
  }

}
