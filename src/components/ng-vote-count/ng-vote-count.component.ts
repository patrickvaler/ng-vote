import {Component, Input} from '@angular/core';

@Component({
    selector: 'ng-vote-count',
    styleUrls: ['ng-vote-count.component.scss'],
    template: `
    <span class="ng-vote-count"
          [ngClass]="{
            'ng-vote-count--positive': count > 0,
            'ng-vote-count--neutral': count === 0,
            'ng-vote-count--negative': count < 0
           }"
    >
        {{ count }}
    </span>
  `
})
export class NgVoteCountComponent {
    @Input() count:number = 0;
}