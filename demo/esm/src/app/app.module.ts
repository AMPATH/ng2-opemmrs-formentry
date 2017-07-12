import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormEntryModule } from '../../lib';
import { AppComponent } from './app.component';


@NgModule({
  imports: [BrowserModule, CommonModule, ReactiveFormsModule, FormEntryModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
