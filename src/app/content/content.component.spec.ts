import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppConfig} from "../appconfig/appconfig.interface";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let httpClient: HttpClient;
  let appConfig: AppConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      providers: [
        {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
      ],
      imports: [HttpClientTestingModule, HttpClientModule],

    })
    .compileComponents();
    appConfig = TestBed.inject(APP_SERVICE_CONFIG);
    appConfig.userServiceApiEndpoint = '';
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
