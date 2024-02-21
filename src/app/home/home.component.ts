import { Component } from '@angular/core';
import {IntroductionComponent} from "./introduction/introduction.component";
import {SkillsComponent} from "./skills/skills.component";
import {AboutComponent} from "./about/about.component";
import {ProjectsComponent} from "./projects/projects.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IntroductionComponent,
    SkillsComponent,
    AboutComponent,
    ProjectsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
