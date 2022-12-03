import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {LoginComponent} from "../login/login.component";
import {DebugElement} from "@angular/core";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let debugEl: DebugElement;
  let userService: UserService;
  let userServiceSpy: { loginUser: jasmine.Spy, saveUserId: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ RegistrationComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print error if email field is not filled', () => {
    expect(component.currentUserForm.email).toEqual('');
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("EMPTY_EMAIL");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Email field should be filled!');
  });

  it('should print error if password field is not filled', () => {
    component.currentUserForm.email = 'user';
    expect(component.currentUserForm.password).toEqual('');
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("EMPTY_PASSWORD");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Password field should be filled!');
  });

  it('should print error if confirm password field is not filled', () => {
    component.currentUserForm.email = 'user';
    component.currentUserForm.password = 'user';
    expect(component.currentUserForm.matchingPassword).toEqual('');
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("EMPTY_MATCHING_PASSWORD");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Confirm password field should be filled!');
  });

  it('should print error if confirm password field is not filled', () => {
    component.currentUserForm.email = 'user';
    component.currentUserForm.password = 'user';
    component.currentUserForm.matchingPassword = 'user123';
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("NON_MATCHING_PASSWORDS");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Passwords should match!');
  });
});
