import { Component, OnInit, Input, NgZone} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import { environment } from '../../environments/environment';

(mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

@Component({
  selector: 'app-map2',
  template: `
    <div class="map" id="map"></div>
    <h6 class="mx-3">Sinu äratuse sihtpunkt on - {{destination}}</h6>
  `,
  styleUrls: ['./map2.component.css']
})
export class Map2Component implements OnInit {
  style = 'mapbox://styles/karlij301/cjp2dbhqx20m12rkd6l95begz';
  zoom: number = 16;
  map: mapboxgl.Map;
  point: mapboxgl.Marker;
  lat = 58.887859;
  lng = 25.541170;
  destination:any;
  
  constructor() { }

  ngOnInit() {
    this.initializeMap();
    
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
        this.setMarker();
      })
      
      
    }
    this.buildMap();
    
  }

  buildMap() {
    

    this.map = new mapboxgl.Map({

      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));
  }
setMarker(){
  
  var point = new mapboxgl.Marker({
    draggable: true
  })
  .setLngLat([this.lng,this.lat])
  .addTo(this.map)

  function onDragEnd() {
    NgZone.assertInAngularZone();
    var destination = point.getLngLat().toArray();
    this.destination = destination;
    console.log('punkti LNG: '+this.destination[0]+' LAT:'+this.destination[1]);
  }

  point.on('dragend', onDragEnd);
}




}
