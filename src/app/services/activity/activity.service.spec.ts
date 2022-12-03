import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ActivityService } from './activity.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {APP_SERVICE_CONFIG} from "../../appconfig/appconfig.service";
import {AppConfig} from "../../appconfig/appconfig.interface";
import {UserService} from "../user/user.service";

describe('ActivityService', () => {
  let service: ActivityService;
  let appConfig: AppConfig;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserConfig', 'getUserId', 'removeData']);
  let USER_ID = 'userid';
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
        {provide: UserService, useValue: userServiceSpy}
      ]
    });

    appConfig = TestBed.inject(APP_SERVICE_CONFIG);
    appConfig.activityServiceApiEndpoint = '';
    userServiceSpy.getUserId.and.returnValue(USER_ID);
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send get request on get all activities', fakeAsync(() => {
    service.getAllUserActivities().subscribe();

    tick();
    let req = httpController.expectOne(`/activities/all/${USER_ID}`);

    expect(req.request.method).toEqual("GET");

    req.flush([]);
  }));

  it('should send get request on get take break', fakeAsync(() => {
    let responseStatus = service.takeUserBreak().subscribe(
      resp => expect(resp).toEqual("OK")
    );
    tick();

    let req = httpController.expectOne(`/activities/break/${USER_ID}`);
    expect(req.request.method).toEqual("GET");

    req.flush('OK');
  }));

  it('should send get request on get today activities', fakeAsync(() => {
    service.getUserTodayActivities().subscribe();

    tick();

    let req = httpController.expectOne(`/activities/today/${USER_ID}`);

    expect(req.request.method).toEqual("GET");

    req.flush([]);
  }));

  it('should send get request on get week activities', fakeAsync(() => {
    service.getUserWeekActivities().subscribe();

    tick();

    let req = httpController.expectOne(`/activities/week/${USER_ID}`);

    expect(req.request.method).toEqual("GET");

    req.flush([]);
  }));

  it('should send get request on get month activities', fakeAsync(() => {
    service.getUserMonthActivities().subscribe();

    tick();

    let req = httpController.expectOne(`/activities/month/${USER_ID}`);

    expect(req.request.method).toEqual("GET");

    req.flush([]);
  }));
});
