import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ChartComponent } from './content/chart/chart.component';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { ArticlesComponent } from './content/articles/articles.component';
import { TableComponent } from './activity/table/table.component';
import { SettingsComponent } from './settings/settings.component';
import {AuthModule} from "./auth/auth.module";
import { PlannerComponent } from './planner/planner.component';
import { AppRoutingModule } from './app-routing.module';
import { ActivityComponent } from './activity/activity.component';
import {APP_CONFIG, APP_SERVICE_CONFIG} from "./appconfig/appconfig.service";
import {HttpClientModule} from "@angular/common/http";
let CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    ChartComponent,
    CanvasJSChart,
    ArticlesComponent,
    TableComponent,
    SettingsComponent,
    PlannerComponent,
    ActivityComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
