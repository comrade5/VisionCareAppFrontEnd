import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppConfig} from "../appconfig/appconfig.interface";
import {NgbAccordion, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;
//   let appConfig: AppConfig;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SettingsComponent ],
//       providers: [
//         {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
//       ],
//       imports: [HttpClientTestingModule, NgbAccordion, FormsModule, NgbModule],
//
//     })
//     .compileComponents();
//
//     appConfig = TestBed.inject(APP_SERVICE_CONFIG);
//     appConfig.userServiceApiEndpoint = '';
//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
