import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {APP_SERVICE_CONFIG} from "../appconfig/appconfig.service";
import {AppConfig} from "../appconfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";
import {Settings} from "../models/interfaces";

const SETTINGS: Settings =
  {
    workInterval: 60,
    advancedWorkInterval: {
      heavyInterval: 10,
      lightInterval: 0,
      mixedIntervalPenalty: 5,
    },
    restInterval: 60,
    advancedRestInterval: {
      heavyInterval: 10,
      lightInterval: 0,
      mixedIntervalPenalty: 5,
    }
  };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings = SETTINGS;
  rangeOutputsMap = new Map<string, number>();

  constructor() {

  }

  ngOnInit(): void {
  }

  updateRangeValue(event: Event) {
    const inputElement = (event.target as HTMLInputElement);
  }
}
