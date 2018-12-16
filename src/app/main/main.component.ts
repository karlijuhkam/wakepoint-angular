import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() { }
  style = 'mapbox://styles/mapbox/streets-v8';
  zoom: number = 16;
  @Input() lat= 58.889305;
  @Input() lng= 25.520473;

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.watchPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('position is: LNG:'+this.lng+' LAT: '+this.lat)
      });
    } else {
      console.log('Geolocation is not working');
      window.alert("Geolocation is not supported by this browser or is not allowed.");
}


  }
}
