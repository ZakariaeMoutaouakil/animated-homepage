import {Component, ElementRef, OnDestroy, OnInit, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatProgressBar,
    MatCardFooter,
    NgOptimizedImage
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
  protected state = 'invisible'
  protected skills: string[] = [
    'PostgreSQL',
    'Spring Boot',
    'Angular',
    'Docker',
    'Ionic',
    'AI'
  ]
  protected value = signal<number>(0)
  private observer: IntersectionObserver | undefined

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
          this.value.set(100)
        } else {
          // Do something when the component is not visible
          this.state = 'invisible'
          this.value.set(0)
        }
      });
    }, {
      threshold: [0.5] // Set the threshold to 0.5 (50% visibility)
    });

    this.observer.observe(this.elementRef.nativeElement)
  }
}
