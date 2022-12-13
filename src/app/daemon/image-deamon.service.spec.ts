import { TestBed } from '@angular/core/testing';

import { ImageDaemonService } from './image-daemon.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "../services/user/user.service";
import {ActivityService} from "../services/activity/activity.service";
import {ImageService} from "../services/image/image.service";
import {MainChannelUtilService} from "../mainChannelUtil/main-channel-util.service";
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {Settings} from "../models/interfaces";
import {Observable} from "rxjs";

describe('ImageDaemonService', () => {
  let service: ImageDaemonService;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserConfig', 'getData', 'removeData']);
  let activityServiceSpy = jasmine.createSpyObj('ActivityService', ['saveData', 'getData', 'removeData']);
  let imageServiceSpy = jasmine.createSpyObj('ImageService', ['saveData', 'isImageServiceUp', 'getData', 'removeData']);
  let mainChannelUtilSpy = jasmine.createSpyObj('MainChannelUtilService', ['saveData', 'getData', 'removeData']);
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: ActivityService, useValue: activityServiceSpy},
        {provide: ImageService, useValue: imageServiceSpy},
        {provide: MainChannelUtilService, useValue: mainChannelUtilSpy},
      ]
    });
    userServiceSpy.getUserConfig.and.returnValue(new Observable(subscriber => subscriber.next(userSetting)));
    service = TestBed.inject(ImageDaemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on start method, image service daemon should be started', () => {
    service.start();
    expect(service.hasStarted()).toBeTruthy();
  });

  it('on start method, image service daemon should be started', () => {
    service.stop();
    expect(service.hasStarted()).toBeFalsy();
  });

  it('status should work well', () => {
    service.start();
    expect(service.getStatus()).toEqual("Work");
    service.isBreak = true;
    expect(service.getStatus()).toEqual("Rest");
  });

  it('extending period should add more time', () => {
    service.extendPeriod(5);
    expect(service.workPeriod).toEqual(4500);
  });

  it('should change period on heavy verdict', () => {
    service.workPeriod = 10000;
    service.restPeriod = 10000;
    service.actOnImageServiceVerdict("heavy");
    expect(service.workPeriod).toEqual(6400);
    expect(service.restPeriod).toEqual(13360);
  });

  it('should change period on light verdict', () => {
    service.workPeriod = 10000;
    service.restPeriod = 10000;
    service.actOnImageServiceVerdict("light");
    expect(service.workPeriod).toEqual(6400);
    expect(service.restPeriod).toEqual(14620);
  });

  it('should change period on mixed verdict', () => {
    service.workPeriod = 10000;
    service.restPeriod = 10000;
    service.actOnImageServiceVerdict("mixed");
    expect(service.workPeriod).toEqual(6400);
    expect(service.restPeriod).toEqual(14680);
  });
});
