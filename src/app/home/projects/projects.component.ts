import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('state', [
      state('invisible', style({
        transform: 'translateY(20%)',
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
export class ProjectsComponent implements OnInit, OnDestroy {
  protected state = 'invisible'
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
