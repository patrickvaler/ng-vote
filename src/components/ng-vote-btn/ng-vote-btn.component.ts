import {Component, Output, EventEmitter, ElementRef} from '@angular/core';
import {INgVoteBtnState} from '../../models/ng-vote-btn-state.interface';

export const ngVoteBtnDefaultState:INgVoteBtnState = {
    selected: false,
    disabled: false
};

@Component({
    selector: 'ng-vote-up, ng-vote-down',
    styleUrls: ['ng-vote-btn.component.scss'],
    template: `
    <button class="ng-vote-btn"
        [class]="selector"
        [ngClass]="{
            'ng-vote-btn--selected': state.selected,
            'ng-vote-btn--disabled': state.disabled
        }" 
        (click)="onClick()" 
        [disabled]="state.disabled">
             <ng-content></ng-content>
    </button>
  `
})
export class NgVoteBtnComponent {
    selector:string;
    state:INgVoteBtnState = ngVoteBtnDefaultState;

    @Output()
    voted = new EventEmitter();

    constructor(ref: ElementRef) {
        this.selector = ref.nativeElement.tagName.toLowerCase();
    }

    setState(state:INgVoteBtnState) {
        this.state = Object.assign({}, this.state, state);
    }

    onClick() {
        this.voted.emit(this.selector)
    }
}
