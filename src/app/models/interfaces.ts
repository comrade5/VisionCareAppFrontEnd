export interface Item {
  name: string;
  link: string;
  summary: string;
}
//
// export interface Activity {
//   heavyActivity: number;
//   lightActivity: number;
//   mixedActivity: number;
//   duration: number;
//   date: Date
// }

export interface Settings {
  workInterval: number;
  workIntervalHeavy: number;
  workIntervalLight: number;
  workIntervalMixed: number;
  restInterval: number;
  restIntervalHeavy: number;
  restIntervalLight: number;
  restIntervalMixed: number;
}

export interface Activity {
  dateOfActivity: Date;
  duration: number;
  heavyActivity: number;
  lightActivity: number;
  mixActivity: number;
}

export interface ApiActivity {
  id: number;
  userId: string;
  dateOfActivity: number;
  dateOfActivityInEpochMillisec: number;
  duration: number;
  heavyActivity: number;
  lightActivity: number;
  mixActivity: number;
}

export interface UserModel {
  email: string;
  password: string;
  matchingPassword: string;
}

export interface Period {
  from: number,
  to: number,
}

export interface TimeCustom {
  hour: number,
  minute: number,
}

export enum NotifyInterval {
  HOURLY= "Hourly", DAILY = "Daily", MONTHLY = "Monthly"
}

export interface Goal {
  goalId: string;
  period: Period;
  name: string;
  summary: string;
  timeDedicated: TimeCustom;
  notifyInterval: NotifyInterval[];
}

export interface Verdict {
  verdict: string,
  verdict_date: { date: number },
}
