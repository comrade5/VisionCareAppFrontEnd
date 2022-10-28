import { Component, OnInit } from '@angular/core';
import {range} from "rxjs";

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
}
