import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {Router} from "@angular/router";
import {DebugElement} from "@angular/core";
import {NgbOffcanvas, NgbOffcanvasConfig} from "@ng-bootstrap/ng-bootstrap";

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;
  let debugEl: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      providers: [
        NgbOffcanvasConfig,
        NgbOffcanvas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    router = TestBed.inject(Router);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
