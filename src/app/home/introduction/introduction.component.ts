import {Component, ElementRef, OnDestroy, OnInit, signal} from '@angular/core';
import {concatMap, delay, finalize, from, mergeMap, of, Subscription} from "rxjs";
import {MatAnchor} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    MatAnchor
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  animations: [
    trigger('state', [
      state('invisible', style({
        transform: 'translateY(100%)',
        opacity: '10%',
        color: 'grey',
        'background-color': 'black'
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: '100%',
        color: 'white',
        'background-color': 'grey'
      })),
      transition('visible <=> invisible', animate(500))
    ])
  ]
})
export class IntroductionComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver | undefined
  state = 'invisible'
  protected readonly message = signal<string>("")
  protected readonly isFinished = signal<boolean>(false);
  private readonly typingSpeed = 100
  private readonly welcomeMessage = "Hi, I'm Zakariae Moutaouakil and I'm a maths/cs student."
  private subscription: Subscription | undefined

  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
    this.subscription?.unsubscribe()
  }

  ngOnInit() {
    this.subscription = this.welcome()
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

  welcome = (): Subscription => {
    return from(this.welcomeMessage.split(""))
      .pipe(
        mergeMap(alphabet => from(alphabet)),
        concatMap(alphabet => of(alphabet)
          .pipe(delay(this.typingSpeed))),
        finalize(() => {
          this.isFinished.set(true)
          this.subscription?.unsubscribe()
        })
      )
      .subscribe(alphabet => {
        this.message.update(oldMessage => oldMessage.concat("", alphabet))
      })
  }
}
