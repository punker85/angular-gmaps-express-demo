import { Component, OnInit } from '@angular/core';
import { CrashEventService, StateService } from 'src/app/services';

export interface EventMarker {
  report_number: number;
  coords: google.maps.LatLng;
}

@Component({
  selector: 'google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  mapOptions: google.maps.MapOptions = {
    backgroundColor: '#002395',
    clickableIcons: false,
    disableDefaultUI: true,
    fullscreenControl: false,
    maxZoom: 20,
    minZoom: 4,
    restriction: {
      latLngBounds: {
        north: 35,
        south: 22,
        west: -99,
        east: -66
      },
      strictBounds: true
    },
  };
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 29.6580,
    lng: -82.3018
  };
  zoom = 12;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  };
  markerOptionsActive: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  };
  markers: EventMarker[] = [];
  currentMarker: number = 0;
  
  constructor(private crashEventService: CrashEventService, private stateService: StateService) {}

  ngOnInit(): void {
    this.showEventMarkers();
    this.stateService.currentMarker.subscribe((value) => {
      console.log('push: ' + value);
      this.currentMarker = value;
    });
  }

  showEventMarkers() {
    this.crashEventService.getAllEvents()
      .subscribe({
        next: (data: any) => {
          this.updateMarkers(data.data);
        },
        error: error => console.log(error)
      });
  }

  updateMarkers(eventMarkers: any[]) {
    eventMarkers.forEach((value) => {
      this.markers.push({ report_number: value.REPORT_NUMBER, coords: new google.maps.LatLng(value.LATITUDE, value.LONGITUDE) });
    });
  }
}