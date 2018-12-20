import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLatBounds } from 'mapbox-gl';
import distance from '@turf/distance';
@Component({
  selector: 'app-map',
  template: `
  <div class="mx-3">
  <h6>Lohista sinist punkti äratuskoha valimiseks -</h6>
  <p class="tiny" (change)="measure()"> {{vahemaa}}</p>
  <p class="tiny"> CURRENT LOCATION: LAT- <b>{{current_lat}}</b> LNG- <b>{{current_lng}}</b></p>
</div>
  
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
<h6 class="mx-3">Sinu äratuse sihtpunkt on <span *ngIf="!destination">määramata.</span><span *ngIf="destination">LAT:{{destinationLAT}} LNG:{{destinationLNG}}</span></h6>
<div class="mx-3 mt-1">
  <div class="buttons mt-3">
    <button class="btn-wake btn-wake-red" (click)="clear()">Tühista</button>
    <button class="btn-wake btn-wake-green" (click)="measure()">Ärata</button>
  </div>
</div>
<div class="teade" *ngIf="active">
  <div class="mx-3 mt-1">
    <div class="buttons mt-3">
      <button class="btn-wake btn-wake-red big" (click)="clear()">ÄRATUS</button>
    </div>
  </div>

</div>  
`,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  style = 'mapbox://styles/karlij301/cjp2dbhqx20m12rkd6l95begz';
  zoom: number = 16;
  lat:any = 58.887859;
  lng:any = 25.541170;
  current_lat:any;
  current_lng:any;
  teade: any;
  destination: any;
  destinationLNG: number;
  destinationLAT: number;
  map: mapboxgl.Map;
  @Input() vahemaa: any;
  active:boolean;
  audio:any = new Audio();
  constructor() { }

  ngOnInit() {
    this.getLocation();
    
    // this.watchLocation();

  }
  public getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('FIRST position is: LNG:'+this.lng+' LAT: '+this.lat)
      });
      navigator.geolocation.watchPosition(position => {
             this.current_lat = position.coords.latitude;
             this.current_lng = position.coords.longitude;
             console.log('CURRENT position is: LNG:'+this.current_lng+' LAT: '+this.current_lat);
             this.measure();
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
      this.measure();
    }

    measure(){
      
        this.vahemaa = distance([this.current_lng,this.current_lat],this.destination,{'units':'meters'});
        if(this.vahemaa<10){
          this.active=true;
          this.audio.src = "../../../assets/alarm.mp3";
          this.audio.load();
          this.audio.play();
        }
      }

    

    clear(){
      this.active=false;
      this.destination = null;
      this.audio.pause();
    }
}
