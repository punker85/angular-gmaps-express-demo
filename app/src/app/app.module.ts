import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { ControlPanelComponent, CrashEventDetailsComponent, CrashEventListComponent, CrashEventItemComponent, GoogleMapsComponent, TitleHeaderComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    CrashEventDetailsComponent,
    CrashEventListComponent,
    CrashEventItemComponent,
    GoogleMapsComponent,
    TitleHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
