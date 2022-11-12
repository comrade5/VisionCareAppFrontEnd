import {Inject, Injectable} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {catchError, Observable, throwError} from "rxjs";
// @ts-ignore
import {jic} from 'j-i-c'
import {Verdict} from "../../models/interfaces";
import {MainChannelUtilService} from "../../mainChannelUtil/main-channel-util.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient,
              private userService: UserService,
              private mainChannelUtil: MainChannelUtilService,
              ) {
  }

  isImageServiceUp() {
    return this.http.get(this.config.imageServiceApiEndpoint + '/test').pipe(
      catchError(err => {
        throw throwError(err);
      }));
  }

  static async convertImageToFile(image: HTMLImageElement) {
    return await fetch(image.src)
      .then(res => res.blob())
      .then(blob => {
        return new File([blob], 'image.png', blob);
      });
  }

  async getScreenshot() : Promise<File> {
    // @ts-ignore
    return await this.mainChannelUtil.sendEventToMain('getScreenshot')
      .then(sources => {
        let image = new Image;
        image.src = sources[0].thumbnail.toDataURL();
        return image;
      })
      .then(async image => await ImageService.convertImageToFile(image))
  }

  sendFile(file: File): Observable<Verdict> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<Verdict>(this.config.imageServiceApiEndpoint+'/images/'+this.userService.getUserId(), formData);
  }

}
