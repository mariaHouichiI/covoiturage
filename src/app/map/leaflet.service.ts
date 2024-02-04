// leaflet.service.ts
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
// ...

@Injectable({
    providedIn: 'root'
  })
  export class LeafletService {
    private map!: L.Map;
    private marker1: L.Marker | null = null;
    private marker2: L.Marker | null = null;
  
    initializeMap(mapElement: HTMLElement, initialCoordinates: L.LatLngExpression = [0, 0]): void {
      this.map = L.map(mapElement).setView(initialCoordinates, 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }

 

    getSelectedPoints(): L.LatLngExpression[] {
        return [this.marker1?.getLatLng(), this.marker2?.getLatLng()].filter(Boolean) as L.LatLngExpression[];
      }
    
    fitBoundsToMarkers(): void {
        const markers: L.Marker[] = [];
        if (this.marker1) markers.push(this.marker1);
        if (this.marker2) markers.push(this.marker2);
      
        if (markers.length > 0) {
          const group = L.featureGroup(markers);  // Utilisez L.featureGroup() sans 'new'
          this.map.fitBounds(group.getBounds());
        }
      }
      
    addMarker(latlng: L.LatLngExpression): void {
      if (!this.marker1) {
        this.marker1 = L.marker(latlng).addTo(this.map);
      } else if (!this.marker2) {
        this.marker2 = L.marker(latlng).addTo(this.map);
      } else {
        // Clear previous markers and set the new one as marker1
        this.clearMarkers();
        this.marker1 = L.marker(latlng).addTo(this.map);
      }
    }
  
 
  
    clearMarkers(): void {
      if (this.marker1) {
        this.map.removeLayer(this.marker1);
        this.marker1 = null;
      }
      if (this.marker2) {
        this.map.removeLayer(this.marker2);
        this.marker2 = null;
      }
    }
  }
  