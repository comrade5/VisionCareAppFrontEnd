import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../services/activity/activity.service";
import {Activity, ApiActivity} from "../models/interfaces";

const ACTIVITIES: Activity[] = [
  {
    heavyActivity: 0.111,
    lightActivity: 0.333,
    mixActivity: 0.600,
    duration: 40,
    dateOfActivity: new Date('2001-01-10'),
  }
];

interface Filter {
  type: string;
  range: string;
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
  }

  constructor(private activityService: ActivityService) {
    // range(1, 10).forEach(e => {
    //   this.activities.push({
    //     heavyActivity: Math.random(),
    //     lightActivity: Math.random(),
    //     mixedActivity: Math.random(),
    //     duration: Math.random()*10+10|0,
    //     date: new Date(Math.random()*10+2000, Math.random()*50),
    //   })
    // });
  }

  ngOnInit(): void {
    this.activityService.getAllUserActivities().subscribe(e => this.mapFromApiActivityToActivity(e));
  }

  private mapFromApiActivityToActivity(e: ApiActivity[]) {
    this.activities = e.map(e => {
      let totalActivity = e.heavyActivity + e.lightActivity + e.mixActivity;
      let activity: Activity = {
        heavyActivity: e.heavyActivity / totalActivity,
        lightActivity: e.lightActivity / totalActivity,
        mixActivity: e.mixActivity / totalActivity,
        duration: e.duration,
        dateOfActivity: new Date(e.dateOfActivityInEpochMillisec),
      }
      return activity;
    });
  }

  // groupByAndFlattenCustom() {
  //   let newArray: Array<Activity> = [];
  //   let groupedDict: _.Dictionary<Activity[]> = _.groupBy(ACTIVITIES, (e: Activity) => e.date.getFullYear().toString()+e.date.getMonth().toString())
  //
  //   Object.entries(groupedDict).forEach(([key, value], index) => {
  //     let heavyActivity: number = 0;
  //     let lightActivity: number = 0;
  //     let mixedActivity: number = 0;
  //     let goalsFulfilled: number = 0;
  //     let year = parseInt(key.substring(0, 4));
  //     let month = parseInt(key.substring(4));
  //
  //     value.forEach(a => {
  //       heavyActivity+=a.heavyActivity;
  //       lightActivity+=a.lightActivity;
  //       mixedActivity+=a.mixedActivity;
  //       goalsFulfilled+=a.duration;
  //     })
  //
  //     heavyActivity/=value.length;
  //     lightActivity/=value.length;
  //     mixedActivity/=value.length;
  //     goalsFulfilled/=value.length;
  //
  //     newArray.push(
  //       {
  //         heavyActivity: heavyActivity,
  //         lightActivity: lightActivity,
  //         mixedActivity: mixedActivity,
  //         duration: goalsFulfilled,
  //         date: new Date(year, month),
  //       }
  //     );
  //   });
  //
  //   this.activities = newArray;
  // }

  onFilterSubmit() {
    switch(this.currentFilter.range) {
      case 'All': this.activityService.getAllUserActivities().subscribe(e => this.mapFromApiActivityToActivity(e)); this.shownBy='daily'; break;
      case 'Today': this.activityService.getUserTodayActivities().subscribe(e => this.mapFromApiActivityToActivity(e)); this.shownBy='hourly'; break;
      case 'Week': this.activityService.getUserWeekActivities().subscribe(e => this.mapFromApiActivityToActivity(e)); this.shownBy='daily'; break;
      case 'Month': this.activityService.getUserMonthActivities().subscribe(e => this.mapFromApiActivityToActivity(e)); this.shownBy='daily'; break;
    }
  }
}
