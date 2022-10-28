import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  workInterval: Number = 50;
  rangeOutputsMap = new Map<string, Number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateRangeValue(event: Event) {
    const inputElement = (event.target as HTMLInputElement);
    this.rangeOutputsMap.set(inputElement.id, parseInt(inputElement.value));
  }
  parseInt(value: string) {
    return parseInt(value);
  }
}
