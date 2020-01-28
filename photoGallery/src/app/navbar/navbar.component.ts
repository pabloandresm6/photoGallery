import { Component, Injectable ,OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../dataservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  title = 'Photo Gallery App | Pablo Maestre';
  search: string;
  

  constructor(private data:DataService) { 

  }

  ngOnInit() {
  }

  keyEvent(value: string) {
    this.data.change(value);
  }

}
