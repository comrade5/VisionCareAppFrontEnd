import { Injectable } from '@angular/core';
import {ImageService} from "../services/image/image.service";
import {UserService} from "../services/user/user.service";
import {Settings, Verdict} from "../models/interfaces";
import {Observer} from "rxjs";
import {ActivityService} from "../services/activity/activity.service";

@Injectable({
  providedIn: 'root'
})
export class ImageDaemonService {


  private currentTime: number = 0;
  private h: number = 0;
  private m: number = 0;
  private s: number = 0;
  private temp: number = 0;
  isBreak: boolean = false;
  workPeriod: number = 0;
  restPeriod: number = 0;
  currentUserSettings: Settings = {} as Settings;
  imageTimer?: ReturnType<typeof setInterval>;
  private isStarted: boolean = false;

  constructor(private imageService: ImageService, private userService: UserService, private activityService: ActivityService) {
    this.userService.getUserConfig().subscribe(e => this.currentUserSettings = e);
    this.refreshPeriods();
  }

  get getHours() {
    return this.h;
  }

  get getMinutes() {
    return this.m;
  }

  get getSeconds() {
    return this.s;
  }

  getNiceFormatTime() {
    // add leading zeros for aesthetics
    let hour = this.h < 10 ? "0" + this.h : this.h;
    let minute = this.m < 10 ? "0" + this.m : this.m;
    let second = this.s < 10 ? "0" + this.s : this.s;

    return hour + ":" + minute + ":" + second;
  }

  reset() {
    this.refreshPeriods();
  }

  private computeVars() {
    let currentTime = this.isBreak ? this.restPeriod : this.workPeriod;
    let temp;
    this.h = Math.floor(currentTime / 60 / 60)
    // remove the hours
    temp = currentTime - this.h * 60 * 60;
    this.m = Math.floor(temp / 60);
    // remove the minutes
    temp = temp - this.m * 60;
    // what left is the seconds
    this.s = temp;
  }

  private refreshPeriods() {
    this.workPeriod = this.currentUserSettings.restInterval*60;
    this.restPeriod = this.currentUserSettings.restInterval*60;
  }

  hasStarted() : boolean {
    return this.isStarted;
  }

  start() {
    this.isStarted = true;
    this.imageTimer = setInterval(this.intervalFunction.bind(this), 1000);
  }

  getStatus() {
    return this.isBreak ? 'Rest' : 'Work';
  }

  stop() {
    this.isStarted = false;
    clearInterval(this.imageTimer);
    this.imageTimer = undefined;
  }

  extendPeriod(addTime: number) {
    this.isBreak ? this.restPeriod += addTime*60 : this.workPeriod += addTime*60;
  }

  actOnImageServiceVerdict(verdict: string) {
    switch(verdict) {
      case 'heavy': {
        this.restPeriod += this.currentUserSettings.restIntervalHeavy*60;
        this.workPeriod -= this.currentUserSettings.workIntervalHeavy*60;
        break;
      }
      case 'light': {
        this.restPeriod += this.currentUserSettings.restIntervalLight*60;
        this.workPeriod -= this.currentUserSettings.workIntervalLight*60;
        break;
      }
      case 'mixed': {
        this.workPeriod -= this.currentUserSettings.workIntervalMixed*60;
        this.restPeriod += this.currentUserSettings.restIntervalMixed*60;
        break;
      }
    }
    if(this.workPeriod <= 0)
      this.switchActivity();
  }

  sendScreenshot() {
    this.imageService.getScreenshot()
      .then((file: File) => {
        this.imageService.sendFile(file)
          .subscribe((e: Verdict) => this.actOnImageServiceVerdict(e.verdict));
      });
  }

  intervalFunction() {
    this.computeVars();
    if(!this.isBreak && (this.workPeriod % (10) == 0 && this.getMinutes != 0)) {
      // Send api request every 5 minutes
      this.imageService.isImageServiceUp()
        .subscribe(
          e => this.sendScreenshot(),
          error => console.log('Error with image service api')
        );
    }

    if(this.isBreak) {
      this.restPeriod--;
      if(this.restPeriod <= 0)
        this.switchActivity();
    } else {
      this.workPeriod--;
      if(this.workPeriod <= 0)
        this.switchActivity();
    }

    console.log(this.getNiceFormatTime());
  }

  private switchActivity() {
    this.isBreak = !this.isBreak;

    if(this.isBreak)
      this.activityService.takeUserBreak()
        .subscribe(n => console.log('User took a break'),
                        e => console.log('Error while pinging /break endpoint of activity service'));

    if(!this.isBreak)
      this.refreshPeriods();

  }
}
