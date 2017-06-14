import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { TrainingsComponent } from './trainings.component';
import { AccountApi }  from './codegen/api/AccountApi';
import { EmergContApi }  from './codegen/api/EmergContApi';
import { ParentApi }  from './codegen/api/ParentApi';
import { PlayerApi }  from './codegen/api/PlayerApi';
import { TrainingApi }  from './codegen/api/TrainingApi';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AccountApi,
    EmergContApi,
    ParentApi,
    PlayerApi,
    TrainingApi,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
