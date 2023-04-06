import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
//import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  //user: User | null;
  // faBook = faBook;
  @ViewChild('sidenav') sidenav: MatSidenav | any;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  appTitle = 'Lakhimpur Girls College';
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private auth: AuthService) {
    // this.auth.user.subscribe((x) => (this.user = x));
    // this.user = this.auth.userValue;
  }

  logout() {
   this.auth.logout();
  }

}
