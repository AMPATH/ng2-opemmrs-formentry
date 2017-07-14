import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormEntryModule } from '../../lib';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule,
  ReactiveFormsModule, FormEntryModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
