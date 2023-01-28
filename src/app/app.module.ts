import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';

import { AppRoute } from 'src/app/app.routes';
import { CoreModule } from '@core/core.module';
import { FireModule } from '@core/fire.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoute,
    CoreModule,
    FireModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
