import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "./model";
import {range} from "rxjs";
import * as _ from "lodash";
import {bootstrapApplication} from "@angular/platform-browser";

const ACTIVITIES: Activity[] = [
  {
    heavyActivity: 0.111,
    lightActivity: 0.333,
    mixedActivity: 0.600,
    goalsFulfilled: 0.500,
    date: new Date('2001-01-10'),
  }
];

interface Filter {
  type: string;
  range: string;
  isFullGoal: boolean;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities: Activity[] = ACTIVITIES;
  shownBy: string = 'daily';

  currentFilter: Filter = {
    type: 'All',
    range: 'All',
    isFullGoal: false,
  }

  constructor() {
    range(1, 10).forEach(e => {
      this.activities.push({
        heavyActivity: Math.random(),
        lightActivity: Math.random(),
        mixedActivity: Math.random(),
        goalsFulfilled: Math.random(),
        date: new Date(Math.random()*10+2000, Math.random()*50),
      })
    });
  }

  ngOnInit(): void {
  }

  groupByAndFlattenCustom() {
    let newArray: Array<Activity> = [];
    let groupedDict: _.Dictionary<Activity[]> = _.groupBy(ACTIVITIES, (e: Activity) => (e.date?.getFullYear()||2).toString()+e.date?.getMonth().toString())

    Object.entries(groupedDict).forEach(([key, value], index) => {
      let heavyActivity: number = 0;
      let lightActivity: number = 0;
      let mixedActivity: number = 0;
      let goalsFulfilled: number = 0;
      let year = parseInt(key.substring(0, 4));
      let month = parseInt(key.substring(4));

      value.forEach(a => {
        heavyActivity+=a.heavyActivity;
        lightActivity+=a.lightActivity;
        mixedActivity+=a.mixedActivity;
        goalsFulfilled+=a.goalsFulfilled;
      })

      heavyActivity/=value.length;
      lightActivity/=value.length;
      mixedActivity/=value.length;
      goalsFulfilled/=value.length;

      newArray.push(
        {
          heavyActivity: heavyActivity,
          lightActivity: lightActivity,
          mixedActivity: mixedActivity,
          goalsFulfilled: goalsFulfilled,
          date: new Date(year, month),
        }
      );
    });

    this.activities = newArray;
  }

  onIntervalGroupsClick(event: Event) {
    const input = (event.target as HTMLInputElement);
    this.groupByAndFlattenCustom();
    this.shownBy = input.id;
  }

  onFilterSubmit() {
    console.log(this.currentFilter)
  }
}
