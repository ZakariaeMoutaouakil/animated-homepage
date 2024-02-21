import {Component, OnInit, signal} from '@angular/core';
import {concatMap, delay, finalize, from, mergeMap, of, Subscription} from "rxjs";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    MatAnchor
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent implements OnInit {
  protected readonly message = signal<string>("")
  protected readonly isFinished = signal<boolean>(false);
  private readonly typingSpeed = 100
  private readonly welcomeMessage = "Hi, I'm Zakariae Moutaouakil and I'm a maths/cs student."
  private subscription: Subscription | undefined
  ngOnInit() {
    this.subscription = this.welcome()
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
