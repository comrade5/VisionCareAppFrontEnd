export interface Item {
  name: string;
  link: string;
  summary: string;
}

export interface AdvancedSettings {
  heavyInterval: number;
  lightInterval: number;
  mixedIntervalPenalty: number;
}

export interface Settings {
  workInterval: number;
  advancedWorkInterval: AdvancedSettings;
  restInterval: number;
  advancedRestInterval: AdvancedSettings;
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
