import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { MapComponent } from './map/map.component';
import { Map2Component } from './map2/map2.component';
const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent,
    MapComponent,
    Map2Component,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoia2FybGlqMzAxIiwiYSI6ImNqcDJjeXNwdTAwNHEzcHMyZGtraHYxYnUifQ.P1Zl4v4pQ6Z_uGPvoIfUXw', // Optionnal, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
