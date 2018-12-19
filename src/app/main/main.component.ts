import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  
  constructor() { }
  

  ngOnInit() {
    // this.getLocation();
  }

//   public getLocation() {
//     /// locate the user
//     if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(position => {
//         this.lat = position.coords.latitude;
//         this.lng = position.coords.longitude;
//         console.log('position is: LNG:'+this.lng+' LAT: '+this.lat)
//       });

//     } else {
//       console.log('Geolocation is not working');
//       window.alert("Geolocation is not supported by this browser or is not allowed.");
//       }
//   }
}
