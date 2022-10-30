import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {range} from "rxjs";
import * as _ from "lodash";

interface Activity {
  heavyActivity: number;
  lightActivity: number;
  mixedActivity: number;
  goalsFulfilled: number;
  date?: Date
}

const ACTIVITIES: Activity[] = [
  {
    heavyActivity: 0.111,
    lightActivity: 0.333,
    mixedActivity: 0.600,
    goalsFulfilled: 0.500,
    date: new Date('2001-01-10'),
  }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  activities = ACTIVITIES;
  previousId: string = 'id';
  shownBy: string = 'daily';

  myMap = new Map<string, string>([
    ["hourly", "H:mm"],
    ["daily", "MMM d, y"],
    ['monthly', "MMM, y"]
  ]);

  constructor() { }

  ngOnInit(): void {
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

  sortList(id: string) {

    const getActivityElementById = function (a: Activity, id: String) {
      switch(id) {
        case 'heavyActivity': {
          return a.heavyActivity;
          break;
        }
        case 'lightActivity': {
          return a.lightActivity;
          break;
        }
        case 'mixedActivity': {
          return a.mixedActivity;
          break;
        }
        case 'goalsFulfilled': {
          return a.goalsFulfilled;
          break;
        }
        case 'date': {
          return (a.date?.getTime() || 1);
          break;
        }
        default:
          return 0;
    };

    }
    let isAsc: Boolean = getActivityElementById(this.activities.at(0) || {} as Activity, id)
                              < getActivityElementById(this.activities.at(1) || {} as Activity, id);

    if(this.previousId == id)
      isAsc = !isAsc;

    this.activities.sort((a: Activity, b: Activity) => isAsc
                                                                    ? getActivityElementById(a, id) - getActivityElementById(b, id)
                                                                      : getActivityElementById(b, id) - getActivityElementById(a, id));

    this.previousId = id;
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
}

// const obj = {
//   name: 'Tom',
//   country: 'Chile',
// };
//
// // ✅ forEach after Object.keys
// (Object.keys(obj) as (keyof typeof obj)[]).forEach((key, index) => {
//   // 👇️ name Tom 0, country Chile 1
//   console.log(key, obj[key], index);
// });
//
// // ✅ forEach after Object.entries (better)
// Object.entries(obj).forEach(([key, value], index) => {
//   // 👇️ name Tom 0, country Chile 1
//   console.log(key, value, index);
// });
