import {Component, ElementRef, OnInit} from '@angular/core';

interface AdvancedSettings {
  heavyInterval: number;
  lightInterval: number;
  mixedInterval: number;
}

interface Settings {
  workInterval: number;
  advancedWorkInterval: AdvancedSettings;
  restInterval: number;
  advancedRestInterval: AdvancedSettings;
}

const SETTINGS: Settings =
  {
    workInterval: 60,
    advancedWorkInterval: {
      heavyInterval: 70,
      lightInterval: 80,
      mixedInterval: 90,
    },
    restInterval: 70,
    advancedRestInterval: {
      heavyInterval: 30,
      lightInterval: 80,
      mixedInterval: 20,
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
