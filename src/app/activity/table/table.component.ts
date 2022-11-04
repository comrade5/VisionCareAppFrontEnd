import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {range} from "rxjs";
import * as _ from "lodash";
import {Activity} from "../model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() activities: Activity[] = [];
  @Input() shownBy: string = 'daily';

  previousId: string = 'id';

  myMap = new Map<string, string>([
    ["hourly", "H:mm"],
    ["daily", "MMM d, y"],
    ['monthly', "MMM, y"]
  ]);

  constructor() { }

  ngOnInit(): void {
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
