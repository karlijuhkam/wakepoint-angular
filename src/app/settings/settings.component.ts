import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router,) { }
  settings: boolean;
  ngOnInit() {
    if(this.router.url === 'settings'){
      this.settings=true;
    }
  }

}
