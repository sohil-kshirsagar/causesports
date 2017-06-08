import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { TrainingsComponent } from './trainings.component';
import { APIServiceFactory } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  	APIServiceFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
