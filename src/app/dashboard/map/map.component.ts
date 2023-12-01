import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { UserService } from '../../services/user.service';
import {io} from 'socket.io-client';
import { Geolocation } from '@capacitor/geolocation';


Leaflet.Icon.Default.imagePath = 'assets/';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private socket = io('https://0241-58-69-61-224.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });
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
  token: any
  usertype:any
  userid:any
  accepterid:any
  channelid:any
  constructor(private userService: UserService){
    this.accepterid = localStorage.getItem("accepter_id")
    this.userid = localStorage.getItem("user_id")
    this.usertype = localStorage.getItem("user_type")
    this.channelid = localStorage.getItem("channel_uuid")
    this.destLat = 14.615436707493016
    this.destLong = 121.18302593231203
    this.srcLat = 14.615436707493016
    this.srcLong = 121.18302593231203
    this.token = localStorage.getItem("user_token");

    // this.socket.on("connect_error", (err) => {
    //   console.log(`connect_error due to ${err.message}`);
    // });

  }

  ngOnInit(): void {

//TEST ROUTES //GET
    this.userService.locSrc.subscribe( //UPDATE SOURCE
      (data: any) =>{
        this.srcLat = data.lat;
        this.srcLong = data.long;
        this.markers[1].setLatLng({ lat: data.lat, lng: data.long });
      }
    )
    this.userService.locDst.subscribe( //UPDATE DSTINATION
      (data: any) =>{
        this.destLat = data.lat;
        this.destLong = data.long;
        this.markers[0].setLatLng({ lat: data.lat, lng: data.long });
      }
    )

//TEST ROUTES //SET

  setInterval(() => {
    this.userCurrentPosition()

    this.userService.getLocation(this.userid)
    .then(res => res.json())
    .then(res => {
      this.markers[0].setLatLng({ lat: res.lat, lng: res.long });
    })

    this.userService.getLocation(this.accepterid)
    .then(res => res.json())
    .then(res => {
      this.markers[1].setLatLng({ lat: res.lat, lng: res.long});
    })

  }, 5000);

  // this.userService.selectMapChannel(this.userid, this.accepterid)
  // .then(res => res.json())
  // .then(res => {
  //   if (this.usertype =='user'){
  //     this.socket.emit('user_join', {"uuid" : res.uuid, "location" : ""});
  //   }
  //   else{
  //     this.socket.emit('accepter_join', {"uuid" : res.uuid, "location" : ""});
  //   }

  // })

  // if (this.usertype =='user'){
  //   this.socket.on('accepter_location_rcv_by_user', (data) => {
  //     console.log(data)
  //     this.userService.setSrc(data[0], data[1] )
  //   });
  // }
  // else{
  //   this.socket.on('user_location_rcv_by_accepter', (data) => {
  //     console.log(data)
  //     this.userService.setDst(data[0], data[1] )
  //   });
  // }



}

userCurrentPosition = async () => { // GET USER CURRENT POSITION
  var self = this;
  let location = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: Infinity
  });
  const wait = Geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}, (position: any, err) => {
    console.log(err)
    console.log(position)

      if (this.usertype =='user'){
        this.userService.debugger("USER "+JSON.stringify(position))
        this.userService.saveLocation(this.userid, JSON.stringify(position.coords.latitude),JSON.stringify(location.coords.longitude))
      }
      else{
        this.userService.debugger("NON-USER "+JSON.stringify(position))
        this.userService.saveLocation(this.accepterid, JSON.stringify(position.coords.latitude),JSON.stringify(location.coords.longitude))
      }
       // save dst coordinates


  });


  }


  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: this.destLat, lng: this.destLong },  //Destination
        draggable: false,
      },
      {
        position: { lat: this.srcLat , lng: this.srcLong  }, //Source
        draggable: false,
      }
    ];

    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      //marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      if(index == 1){
        marker.addTo(this.map).bindPopup(`<b>SERVICE PROVIDER</b>`).openPopup();
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
        [Number(this.destLat), Number(this.destLong)], //Destination
        [Number(data.lat), Number(data.long)], //Source
      ];
      //this.map.panTo(new Leaflet.LatLng(Number(data.lat), Number(data.long)));
      pLineGroup.clearLayers()
      pLineGroup.addLayer(Leaflet.polyline(polylinePoints))
      pLineGroup.addTo(this.map)

      }
    )

    this.userService.locDst.subscribe(
      (data: any) =>{
       // console.log(data);
       var polylinePoints:  [number, number][] = [
        [Number(data.lat), Number(data.long)], //Destination
        [Number(this.srcLat), Number(this.srcLong)], //Source
      ];
      //this.map.panTo(new Leaflet.LatLng(Number(data.lat), Number(data.long)));
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


