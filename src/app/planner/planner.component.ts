import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap'
import { v4 as uuid } from 'uuid';
import {ApiActivity, Goal, NotifyInterval, Period, TimeCustom} from "../models/interfaces";
import {UserService} from "../services/user/user.service";
import {ActivityService} from "../services/activity/activity.service";

const GOALS: Goal[] = [
  {
    goalId: uuid(),
    period: {from: new Date(2001, 1).valueOf(), to: new Date(2001, 11).valueOf()},
    name: "Math Exam",
    summary: "Want to learn more about integrals",
    timeDedicated: {hour: 12, minute: 30},
    notifyInterval: [NotifyInterval.HOURLY, NotifyInterval.MONTHLY],
  },
  {
    goalId: uuid(),
    period: {from: new Date(2001, 1).valueOf(), to: new Date(2001, 11).valueOf()},
    name: "History Exam",
    summary: "Want to learn more about mongols",
    timeDedicated: {hour: 12, minute: 30},
    notifyInterval: [NotifyInterval.HOURLY, NotifyInterval.MONTHLY],
  },
  {
    goalId: uuid(),
    period: {from: new Date(2001, 1).valueOf(), to: new Date(2001, 11).valueOf()},
    name: "Physics Exam",
    summary: "Want to learn more about quantum physics",
    timeDedicated: {hour: 12, minute: 30},
    notifyInterval: [NotifyInterval.HOURLY, NotifyInterval.MONTHLY],
  },
]

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  goals: Goal[] = GOALS;
  goalForm: Goal = PlannerComponent.getEmptyGoal();
  progressMap: Map<string, number>;

  static getEmptyGoal() : Goal {
    return {
      goalId: uuid(),
      period: {} as Period,
      name: '',
      summary: '',
      timeDedicated: {hour: 0, minute: 0} as TimeCustom,
      notifyInterval: [],
    };
  }

  ngOnInit(): void {
    this.userService.getUserGoals().subscribe(e => this.goals = e);
    this.activityService.getAllUserActivities().subscribe(e => this.computeProgresses(e));
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar, private userService: UserService, private activityService: ActivityService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.progressMap = new Map<string, number>();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  printNotifyInterval(list: Array<NotifyInterval>) {
    return list.reduce((a: string, b: NotifyInterval) => a + ' | ' + b, '').substring(2);
  }

  onGoalFormSubmit() {
    this.goalForm.period =
      {
        from: new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day).valueOf(),
        to: this.toDate ? new Date(this.toDate.year, this.toDate.month-1, this.toDate.day).valueOf()
                        : new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day, 23, 59, 59).valueOf(),
      };

    this.goals = [...this.goals, this.goalForm];
    this.userService.addUserGoal(this.goalForm);

    this.goalForm = PlannerComponent.getEmptyGoal();
  }

  getNotifyInterval(intervalString: string) {
    switch(intervalString.toUpperCase()) {
      case NotifyInterval.DAILY.toUpperCase(): return NotifyInterval.DAILY;
      case NotifyInterval.HOURLY.toUpperCase(): return NotifyInterval.HOURLY;
    }

    return NotifyInterval.MONTHLY;
  }

  addToCheckedIntervals($event: MouseEvent) {
    const input = ($event.target as HTMLInputElement);
    const interval = this.getNotifyInterval(input.id);
    this.goalForm.notifyInterval.includes(interval)
      ? this.goalForm.notifyInterval = this.goalForm.notifyInterval.filter(e => e != interval)
      : this.goalForm.notifyInterval.push(interval);
  }

  removeGoal(goalId: string) {
    this.userService.removeUserGoal(goalId);
    this.goals = this.goals.filter(e => e.goalId != goalId);
  }

  convertToMinutes(goal: Goal) {
    return (goal.timeDedicated.hour * 60 + goal.timeDedicated.minute);
  }

  private computeProgresses(e: ApiActivity[]) {
    this.goals.forEach(goal => {

      let betweenActivities =
        e
          .filter(act => act.dateOfActivityInEpochMillisec <= goal.period.to
                          && act.dateOfActivityInEpochMillisec >= goal.period.from);
      let totalDuration = 0;
      betweenActivities.forEach(e => totalDuration+=e.duration);

      this.progressMap.set(goal.goalId, totalDuration);
    })
  }

  isExpired(goal: Goal) {
    return new Date().valueOf() > goal.period.to;
  }
}
