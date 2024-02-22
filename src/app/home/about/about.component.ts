import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('state', [
      state('invisible', style({
        transform: 'translateY(50%)',
        opacity: '10%',
        color: 'grey'
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: '100%',
        color: 'white'
      })),
      transition('visible <=> invisible', animate(500))
    ])
  ]
})
export class AboutComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver | undefined
  state = 'invisible'

  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
  }

  ngOnInit(): void {
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
      threshold: [0.3] // Set the threshold to 0.5 (50% visibility)
    });

    this.observer.observe(this.elementRef.nativeElement)
  }
}
