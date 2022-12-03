import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import {Router} from "@angular/router";
import {ImageDaemonService} from "../daemon/image-daemon.service";
import {DebugElement} from "@angular/core";

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  let debugEl: DebugElement;
  let buttons: HTMLButtonElement[];
  let daemonServiceSpy = jasmine.createSpyObj("ImageDaemonService", ['getStatus', 'extendPeriod', 'reset', 'stop', 'start'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      providers: [
        { provide: ImageDaemonService, useValue: daemonServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
    buttons = debugEl.nativeElement.querySelectorAll('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show work status', () => {
    daemonServiceSpy.getStatus.and.returnValue('Work');
    fixture.detectChanges();
    let content = debugEl.nativeElement.querySelector('h1').textContent;
    expect(content)?.toEqual('Work period');
  });

  it('should show rest status', () => {
    daemonServiceSpy.getStatus.and.returnValue('Rest');
    fixture.detectChanges();
    let content = debugEl.nativeElement.querySelector('h1').textContent;
    expect(content)?.toEqual('Rest period');
  });

  it('should start the timer', () => {
    buttons[0].click();
    fixture.detectChanges();
    expect(daemonServiceSpy.start).toHaveBeenCalled();
  });

  it('should stop the timer', () => {
    buttons[1].click();
    fixture.detectChanges();
    expect(daemonServiceSpy.stop).toHaveBeenCalled();
  });

  it('should reset the timer', () => {
    buttons[2].click();
    fixture.detectChanges();
    expect(daemonServiceSpy.reset).toHaveBeenCalled();
  });

  it('should add 5 minutes', () => {
    buttons[3].click();
    fixture.detectChanges();
    expect(daemonServiceSpy.extendPeriod).toHaveBeenCalledWith(5);
  });
});
