import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Colors } from './colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  colors: Colors[];
  searchColor: string;
  copyOfColors = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    //fetching json data from assets/colorsData.json path.
    this.httpClient.get('assets/colorsData.json').subscribe((data) => {
      if (!!data['details']) {
        this.colors = data['details'];
        this.copyOfColors = this.makeShallowCopy(this.colors);
      }
    })
  }
  search() {
    this.copyOfColors = this.makeShallowCopy(this.colors);
    if (!!this.searchColor) {
      //Checking name and hex with searched data from input and filtering out the array.
      this.copyOfColors = this.colors.filter(data =>
        data.hex.toUpperCase().includes(this.searchColor.toUpperCase()) ||
        data.name.toUpperCase().includes(this.searchColor.toUpperCase()));
    }
  }
  makeShallowCopy(data) {
    //Makes shallow copy and return the sorted data by name.
    return Object.assign(data.sort(function (a, b) { return a.name > b.name ? 1 : -1; }));
  }
}
