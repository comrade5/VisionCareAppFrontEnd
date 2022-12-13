import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerComponent } from './planner.component';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {StorageService} from "../storage/storage.service";
import {AppConfig} from "../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// describe('PlannerComponent', () => {
//   let component: PlannerComponent;
//   let fixture: ComponentFixture<PlannerComponent>;
//   let appConfig: AppConfig;
//   let httpClient: HttpClient;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PlannerComponent ],
//       providers: [
//         {provide: APP_SERVICE_CONFIG, useValue: APP_SERVICE_CONFIG},
//       ],
//       imports: [HttpTestingController, FormsModule, NgbModule]
//     })
//     .compileComponents();
//
//     httpClient = TestBed.inject(HttpClient);
//     appConfig = TestBed.inject(APP_SERVICE_CONFIG);
//     appConfig.imageServiceApiEndpoint = '';
//     appConfig.userServiceApiEndpoint = '';
//     fixture = TestBed.createComponent(PlannerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
