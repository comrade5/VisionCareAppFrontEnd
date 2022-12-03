import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {StorageService} from "../../storage/storage.service";
import {APP_CONFIG, APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {UserModel, Settings} from "../../models/interfaces";
import {defer, Observable, throwError} from "rxjs";

describe('UserService', () => {
  let userService: UserService;
  let localStore = jasmine.createSpyObj('StorageService', ['saveData', 'getData', 'removeData']);
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  let appConfig: AppConfig;
  let userModel: UserModel = {
    email: "malik@gmail.com",
    password: "123abc",
    matchingPassword: "123abc",
  };

  let userSetting: Settings = {
    workInterval: 123,
    workIntervalHeavy: 60,
    workIntervalLight: 60,
    workIntervalMixed: 60,
    restInterval: 70,
    restIntervalHeavy: 56,
    restIntervalLight: 77,
    restIntervalMixed: 78,
  }

  let USER_ID = "userid";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
        {provide: StorageService, useValue: localStore},
      ],
      imports: [HttpClientTestingModule],
    });

    httpController = TestBed.inject(HttpTestingController);
    appConfig = TestBed.inject(APP_SERVICE_CONFIG);
    appConfig.userServiceApiEndpoint = '';
    userService = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('on register, the user id should be saved in local storage', fakeAsync(() => {
    //httpClientSpy.post.and.returnValue();
    userService.registerUser(userModel);
    tick();

    const req = httpController.expectOne('/register');
    expect(req.request.method).toEqual("POST");

    req.flush(USER_ID);
    expect(localStore.saveData).toHaveBeenCalled();

  }));

  it('should success on existing user login', fakeAsync(() => {
    //httpClientSpy.post.and.returnValue();
    userService.loginUser(userModel).subscribe(
      resp => expect(resp).toEqual("success")
    );
    tick();

    const req = httpController.expectOne('/check');
    expect(req.request.method).toEqual("POST");

    req.flush("success");

  }));

  it('should fail on non-existing user login', fakeAsync(() => {
    //httpClientSpy.post.and.returnValue();
    userService.loginUser(userModel).subscribe(
      () => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401, 'status');
        expect(error.error).toEqual('Unauthorized user', 'message');
      }
    );
    tick();

    const req = httpController.expectOne('/check');
    expect(req.request.method).toEqual("POST");

    req.flush('Unauthorized user', { status: 401, statusText: 'Unauthorized' });

  }));

  it('user should be logged in',() => {
    //httpClientSpy.post.and.returnValue();
    localStore.getData.and.returnValue(USER_ID);
    let isLoggedIn = userService.isLoggedIn();

    expect(isLoggedIn).toBeTruthy();
  });

  it('user should not be logged in',() => {
    //httpClientSpy.post.and.returnValue();
    localStore.getData.and.returnValue('');
    let isLoggedIn = userService.isLoggedIn();

    expect(isLoggedIn).toBeFalsy();
  });

  it('should send and save the user config successfully', fakeAsync(() => {
    localStore.getData.and.returnValue(USER_ID);
    userService.sendUserConfig(userSetting);
    tick();

    let req = httpController.expectOne(`/config/${USER_ID}`);

    expect(req.request.method).toEqual("PUT");

    req.flush(userSetting);
    expect(localStore.saveData).toHaveBeenCalledWith('userConfig', JSON.stringify(userSetting));
  }));
});
