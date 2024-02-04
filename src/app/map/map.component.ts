import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LeafletService } from './leaflet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;

  constructor(private leafletService: LeafletService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const initialCoordinates: L.LatLngExpression = [0, 0];
    //this.leafletService.initializeMap(this.mapElement.nativeElement, initialCoordinates);
  }

  onMapClick(event: L.LeafletMouseEvent): void {
    const latlng: L.LatLngExpression = event.latlng;
    this.leafletService.addMarker(latlng);
  }



  getSelectedPoints(): L.LatLngExpression[] {
    return this.leafletService.getSelectedPoints();
  }


  clearMarkers(): void {
    const initialCoordinates: L.LatLngExpression = [0, 0];
    this.leafletService.initializeMap(this.mapElement.nativeElement, initialCoordinates);
    this.leafletService.clearMarkers();
  }
}
