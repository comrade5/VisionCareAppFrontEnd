import {AfterViewInit, Component, ElementRef, Inject, OnInit} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {AppConfig} from "../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {Settings} from "../models/interfaces";
import {ImageService} from "../services/image/image.service";
import {UserService} from "../services/user/user.service";



const DEFAULT_SETTINGS: Settings =
  {
    restInterval: 60,
    restIntervalHeavy: 10,
    restIntervalLight: 0,
    restIntervalMixed: 5,
    workInterval: 60,
    workIntervalHeavy: 10,
    workIntervalLight: 0,
    workIntervalMixed: 5,
  };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userSettings: Settings = DEFAULT_SETTINGS;
  endDate: Date = new Date(2022, 11, 11);
  initDate: Date = new Date(2022, 11, 12);
  current: number = 100;
  max: number = 200;

  constructor(private imageService: ImageService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    if(this.userService.isLoggedIn()) {
      this.getSettings();
    }

  }

  getSettings() {
    this.userService.getUserConfig()
        .subscribe((data: Settings) => {
          this.userSettings=data;
          this.userService.saveUserConfig(data);
        });
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    const file:File = ($event.target as HTMLInputElement).files[0];

    this.imageService.sendFile(file).subscribe(e => console.log(e));

  }

  onSettingsFormSubmit() {
    this.userService.sendUserConfig(this.userSettings);
  }

  takeScreenShot(imageElem: HTMLImageElement) {
    this.imageService.getScreenshot().then(e => console.log(e));
  }

  doSomethingWithCurrentValue($event: number) {

  }
}
