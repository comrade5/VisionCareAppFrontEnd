import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap'

interface Period {
  from: Date,
  to: Date,
}

interface TimeCustom {
  hour: number,
  minute: number,
}

enum NotifyInterval {
  HOURLY= "Hourly", DAILY = "Daily", MONTHLY = "Monthly"
}

interface Goal {
  period: Period,
  name: string,
  summary: string,
  hoursDedicated: TimeCustom,
  notifyInterval: NotifyInterval[],
}

const GOALS: Goal[] = [
  {
    period: {from: new Date(2001, 1), to: new Date(2001, 11)},
    name: "Math Exam",
    summary: "Want to learn more about integrals",
    hoursDedicated: {hour: 12, minute: 30},
    notifyInterval: [NotifyInterval.HOURLY, NotifyInterval.MONTHLY],
  },
  {
    period: {from: new Date(2001, 1), to: new Date(2001, 11)},
    name: "History Exam",
    summary: "Want to learn more about mongols",
    hoursDedicated: {hour: 12, minute: 30},
    notifyInterval: [NotifyInterval.HOURLY, NotifyInterval.MONTHLY],
  },
  {
    period: {from: new Date(2001, 1), to: new Date(2001, 11)},
    name: "Physics Exam",
    summary: "Want to learn more about quantum physics",
    hoursDedicated: {hour: 12, minute: 30},
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

  goalForm: Goal = {
    period: {} as Period,
    name: '',
    summary: '',
    hoursDedicated: {hour: 0, minute: 0} as TimeCustom,
    notifyInterval: [],
  }

  ngOnInit(): void {
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = date;
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
        from: new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day),
        to: new Date(this.toDate.year, this.toDate.month, this.toDate?.day),
      };

    this.goals = [...this.goals, this.goalForm];
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
}
