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
        transform: 'translateY(20%)',
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
  protected state = 'invisible'
  protected aboutText = 'As a dedicated student pursuing a double major in Mathematics and Computer Science, I bring a strong foundation in pure mathematics coupled with a passion for the dynamic world of web development. With a rigorous background in mathematics, I am adept at tackling complex problems with logical precision and analytical thinking. However, my true enthusiasm lies in the realm of web development, where I thrive on the creative challenge of bringing ideas to life through code. Whether exploring algorithms or crafting elegant user interfaces, I am constantly seeking to expand my knowledge and skills at the intersection of mathematics and technology, driven by a curiosity to discover innovative solutions and make meaningful contributions to the digital landscape.'
  private observer: IntersectionObserver | undefined

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
