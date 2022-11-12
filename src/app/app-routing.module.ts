import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings/settings.component";
import {PlannerComponent} from "./planner/planner.component";
import {ContentComponent} from "./content/content.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {TableComponent} from "./activity/table/table.component";
import {ActivityComponent} from "./activity/activity.component";
import {TimerComponent} from "./timer/timer.component";

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'planner', component: PlannerComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'main', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'activity', component: ActivityComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
