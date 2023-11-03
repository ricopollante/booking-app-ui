import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { UserService } from '../services/user.service';
import {io} from 'socket.io-client';
import { Geolocation } from '@capacitor/geolocation';


Leaflet.Icon.Default.imagePath = 'assets/';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private socket = io('https://8410-58-69-61-224.ngrok-free.app/');
  destLat: any;
  destLong: any;
  srcLat: any;
  srcLong: any;
  title = 'AngularOSM';
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    //center: { lat: 14.1407, lng: 121.4692 }
  }

  constructor(private userService: UserService){
    this.destLat = 0
    this.destLong = 0
  }

  ngOnInit(): void {

//TEST ROUTES //GET
    this.userService.locSrc.subscribe( //UPDATE SOURCE
      (data: any) =>{
        this.markers[1].setLatLng({ lat: data.lat, lng: data.long });
      }
    )
    this.userService.locDst.subscribe( //UPDATE DSTINATION
      (data: any) =>{
        this.markers[0].setLatLng({ lat: data.lat, lng: data.long });
      }
    )
//TEST ROUTES //SET

  // setInterval(() => {
  //   this.destLat  = this.destLat  - .0001
  //   this.destLong = this.destLong  - .0001
  //   //this.userService.setSrc(this.destLat, this.destLong ) // send src coordinates
  // }, 1000);

  const printCurrentPosition = async () => {
    var self = this;
    let location = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000
    });
    const wait = Geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}, (position, err) => {
        this.userService.debugger(JSON.stringify(location))
        this.userService.setDst(Number(JSON.stringify(location.coords.latitude)), Number(JSON.stringify(location.coords.longitude)))
    });
}

printCurrentPosition()

  this.socket.emit('on_location', {"uuid" : "2sad-234ds-32423-45eedd", "location" : ""});
  this.socket.on('on_location_rcv', (data) => {
    console.log(data)
    this.userService.setSrc(data[0], data[1] ) // send src coordinates
  });

  }


  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 14.6178, lng: 121.0572 },  //Destination
        draggable: false,
      },
      {
        position: { lat: this.destLat+ Math.random()* 0.00900, lng: this.destLong+ Math.random()* 0.00900 }, //Source
        draggable: false,
      }
    ];

    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      //marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      if(index == 1){
        marker.addTo(this.map).bindPopup(`<b>CAREGIVER</b>`).openPopup();
      }
      if(index ==0){
        marker.addTo(this.map).bindPopup(`<b>USER</b>`).openPopup();
      }
      this.map.panTo(data.position);
      this.markers.push(marker)
    }

    // this.userService.locSrc.subscribe(
    //   (data: any) =>{
    //    // console.log(data);
    //     this.markers[1].setLatLng({ lat: data.lat, lng: data.long });
    //   }
    // )


    var pLineGroup = Leaflet.layerGroup()
    this.userService.locSrc.subscribe(
      (data: any) =>{
       // console.log(data);
       var polylinePoints:  [number, number][] = [
        [Number(initialMarkers[0].position.lat), Number(initialMarkers[0].position.lng)], //Source
        [Number(initialMarkers[0].position.lat+ Math.random()* 0.00900 ) , Number(initialMarkers[0].position.lng+Math.random()* 0.00900  )],
        [Number(data.lat), Number(data.long)],  //Destination
      ];
      this.map.panTo(new Leaflet.LatLng(Number(data.lat), Number(data.long)));
      pLineGroup.clearLayers()
      pLineGroup.addLayer(Leaflet.polyline(polylinePoints))
      pLineGroup.addTo(this.map)

      }
    )



  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }



}


