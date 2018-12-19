import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  template: `
  <mgl-map
  [center]="[lng,lat]"
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
<h6 class="mx-3">Sinu äratuse sihtpunkt on - <span *ngIf="destination">LAT:{{destinationLAT}} LNG:{{destinationLNG}}</span></h6>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  style = 'mapbox://styles/karlij301/cjp2dbhqx20m12rkd6l95begz';
  zoom: number = 16;
  lat:any = 54.3333;
  lng:any = 54.3333;
  teade: any;
  destination: any;
  destinationLNG: number;
  destinationLAT: number;
  map: mapboxgl.Map;
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
 
    onDragEnd(marker: mapboxgl.Marker) {
      NgZone.assertInAngularZone();
      this.destination = marker.getLngLat().toArray();
      this.destinationLNG = this.destination[0];
      this.destinationLAT = this.destination[1];


      
    }
  
}
