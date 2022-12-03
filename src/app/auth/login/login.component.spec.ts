import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {DebugElement} from "@angular/core";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {defer, Observable} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;
  let userService: UserService;
  let userServiceSpy: { loginUser: jasmine.Spy, saveUserId: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let router: Router;


  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj(UserService, ['loginUser', 'saveUserId']);
    routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
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

  it('should print error if user is not found', fakeAsync(() => {
    component.currentUserForm.email = 'user';
    component.currentUserForm.password = 'user';
    userServiceSpy.loginUser.and.returnValue(new Observable(s => s.next("NOT_FOUND")));
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("NOT_FOUND");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('User with such email not found!');
  }));

  it('should print error if user provided bad credentials', () => {
    component.currentUserForm.email = 'user';
    component.currentUserForm.password = 'user';
    userServiceSpy.loginUser.and.returnValue(new Observable(s => s.next("BAD_CREDENTIALS")));
    debugEl.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.userError).toEqual("BAD_CREDENTIALS");
    const compiled = debugEl.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Email or password is incorrect!');
  });
});
