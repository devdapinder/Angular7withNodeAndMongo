import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1style: boolean = false;
  users: object;

  constructor(private data: DataService) {

  }

  ngOnInit() {
    this.data.getActualUsers().subscribe(data => {
      this.users = data;
      console.log('Users data: ' + JSON.stringify(this.users));
    });
  }

  fisrtClick() {
    this.h1style = true;
    console.log('changed H1 Style');

  }
}
