import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidenavbar',
  templateUrl: 'sidenavbar.component.html',
  styleUrls: ['sidenavbar.component.css'],
})
export class SidenavAutosize {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  appTitle = "Its a Demo"
}