import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Zakariae Moutaouakil'

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
  }

}
