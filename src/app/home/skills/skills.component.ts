import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  styleUrl: './skills.component.scss',
  animations: [
    trigger('state', [
      state('invisible', style({
        transform: 'translateY(100%)',
        opacity: '0',
        color: 'grey',
        // 'background-color': 'black'
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: '100%',
        color: 'white',
        // 'background-color': 'grey'
      })),
      transition('visible <=> invisible', animate(500))
    ])
  ]
})
export class SkillsComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver | undefined
  state = 'invisible'
  states: string[] = new Array(4).fill('invisible')

  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Do something when the component is visible
          this.state = 'visible'
        } else {
          // Do something when the component is not visible
          this.state = 'invisible'
        }
      });
    }, {
      threshold: [0.5] // Set the threshold to 0.5 (50% visibility)
    });

    this.observer.observe(this.elementRef.nativeElement)
  }
}
