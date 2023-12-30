import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible!: boolean;
  topSidebarVisible!:boolean
  ngOnInit() {
   this.sidebarVisible= true;
 }
  onSidebarShow() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the sidebar is open
  }

  onSidebarHide() {
    document.body.style.overflow = ''; // Allow scrolling when the sidebar is closed
  }

 
}
