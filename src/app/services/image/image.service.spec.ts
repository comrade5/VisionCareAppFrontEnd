import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppConfig} from "../../appconfig/appconfig.interface";

// describe('ImageService', () => {
//   let service: ImageService;
//   let appConfig: AppConfig;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//       {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
//     ],
//       imports: [HttpClientTestingModule],
//
//     });
//     service = TestBed.inject(ImageService);
//     appConfig = TestBed.inject(APP_SERVICE_CONFIG);
//     appConfig.userServiceApiEndpoint = '';
//     appConfig.imageServiceApiEndpoint = '';
//     appConfig.activityServiceApiEndpoint = '';
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
