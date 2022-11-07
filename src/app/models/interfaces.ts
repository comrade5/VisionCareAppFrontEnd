export interface Item {
  name: string;
  link: string;
  summary: string;
}

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

export interface ApiActivity {
  id: number;
  userId: string;
  dateOfActivity: string;
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
