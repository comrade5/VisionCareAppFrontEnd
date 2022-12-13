import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {StorageService} from "../storage/storage.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppConfig} from "../appconfig/appconfig.interface";

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;
  let appConfig: AppConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityComponent ],
      providers: [
        {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
      ],
      imports: [HttpClientTestingModule],

    })
    .compileComponents();

    appConfig = TestBed.inject(APP_SERVICE_CONFIG);
    appConfig.userServiceApiEndpoint = '';
    appConfig.activityServiceApiEndpoint = '';
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
