import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  template: `
  <mgl-map
  [style]="style"
  [zoom]="[zoom]"

  [fitBounds]="bounds"
  [fitBoundsOptions]="{
    padding: 20
  }"
>
 
 <mgl-control 
 mglGeolocate
 trackUserLocation="true"
 showUserLocation="true"
 [positionOptions]="{
  enableHighAccuracy: true
}">
</mgl-control>
<mgl-marker
    [lngLat]="[lng, lat]"
    [draggable]="true"
    (dragEnd)="onDragEnd($event)"
  ></mgl-marker>
</mgl-map>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  style = 'mapbox://styles/karlij301/cjp2dbhqx20m12rkd6l95begz';
  zoom: number = 16;
  @Input() lat:any = 54.3333;
  @Input() lng:any = 54.3333;
  teade: any;
  destination: any;
  constructor() { }

  ngOnInit() {
    this.getLocation();

  }
  public getLocation() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('position is: LNG:'+this.lng+' LAT: '+this.lat)
      });

    } else {
      console.log('Geolocation is not working');
      window.alert("Geolocation is not supported by this browser or is not allowed.");
      }
  }
 
    onDragEnd(marker: Marker) {
      NgZone.assertInAngularZone();
      this.destination = marker.getLngLat().toArray();


      
    }
  
}
