import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() { }
  style = 'mapbox://styles/mapbox/streets-v8';
  zoom: number = 16;
  lat= 58.889305;
  lng= 25.520473;

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      } 
      );
    }


  }
}
