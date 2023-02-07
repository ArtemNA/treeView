import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get title() {
    return this._title.getTitle();
  };

  constructor(private readonly _title: Title) {
  }

  ngOnInit(): void {
  }

}
