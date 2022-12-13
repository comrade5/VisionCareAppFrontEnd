import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppConfig} from "../appconfig/appconfig.interface";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appConfig: AppConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
      ],
      imports: [HttpClientTestingModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    appConfig = TestBed.inject(APP_SERVICE_CONFIG);
    appConfig.userServiceApiEndpoint = '';
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
