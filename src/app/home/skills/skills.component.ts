import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatProgressBar,
    MatCardFooter
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
