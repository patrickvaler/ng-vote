import { Component, ContentChildren, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, 
    AfterContentInit, QueryList } from '@angular/core';
import { INgVoteConfig } from '../../models/ng-vote-config.interface';
import { INgVoteTypes } from '../../models/ng-vote-types.interface';
import { NgVoteBtnComponent } from '../../components/ng-vote-btn/ng-vote-btn.component';

export const voteTypes:INgVoteTypes = {
    upVote: 1,
    downVote: -1,
    none: 0
};

const voteTypesList:string[] =  Object.keys(voteTypes).map((key) => voteTypes[key]);

export const ngVoteDefaultConfig:INgVoteConfig = {
    allowEdit: true,
    disabled: false,
    cssClass: '' 
};

@Component({
    selector: 'ng-vote',
    styleUrls: ['ng-vote.component.scss'],
    template: `
                <div class="ng-vote" [ngClass]="this.config.cssClass">
                    <!-- Vote Up Button -->
                    <ng-content select="ng-vote-up"></ng-content>
                    <!-- Count -->
                    <ng-vote-count [count]="totalVotes"></ng-vote-count> 
                    <!-- Vote Down Button -->
                    <ng-content select="ng-vote-down"></ng-content>
                </div>
             `
})
export class NgVoteComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    voteTypes:INgVoteTypes = voteTypes;
    subscriptionList: any[] = [];

    @Input() totalVotes:number = 0;
    @Input() selectedVote:number = 0;
    @Input() config:INgVoteConfig;

    @Output()
    vote: EventEmitter<any> = new EventEmitter();

    @ContentChildren(NgVoteBtnComponent) ngVoteBtnInstances: QueryList<NgVoteBtnComponent>;

    constructor() {}

    ngOnInit() {
        this.totalVotes = typeof this.totalVotes === 'number' ? this.totalVotes : 0;
        this.selectedVote = Object.keys(voteTypes).map((key) => voteTypes[key])
                                .includes(this.selectedVote) 
                                    ? this.selectedVote : this.voteTypes.none;

        this.config = Object.assign({}, ngVoteDefaultConfig, this.config);
    }

    ngOnChanges(changes) {
        if (changes.config) {
            this.config = Object.assign({}, ngVoteDefaultConfig, this.config, changes.config.currentValue);
        }

        if (changes.totalVotes) {
            this.totalVotes = typeof changes.totalVotes.currentValue === 'number' ? changes.totalVotes.currentValue : 0;
        }

        if (changes.selectedVote) {
            let isValid = voteTypesList.includes(changes.selectedVote.currentValue);
            this.selectedVote =  isValid ? changes.selectedVote.currentValue : this.voteTypes.none;
        }
    }

    ngAfterContentInit() {
        this.ngVoteBtnInstances
            .forEach((instance) => {
                // Subscribes on voted event of ngVoteBtn instance
                this.subscriptionList.push(instance.voted.subscribe((selector:string) => {
                    this.onVote(this.getVoteValueByChildSelector(selector));
                }));

                // initialize button state
                instance.setState({
                    selected: this.selectedVote === this.getVoteValueByChildSelector(instance.selector),
                    disabled: !this.isVotingEnabled()
                })
            })
    }

    ngOnDestroy() {
        this.subscriptionList.forEach((subscription) => subscription.unsubscribe);
    }

    /**
     * Re-calculates the totalVotes based on the current voteBtn selection, updates child 
     * components and fires vote Output EventEmitter
     * 
     * @param currentVote number
     */
    onVote(currentVote:number) {
        if (!this.isVotingEnabled()) { return; }
        
        this.calculateVote(currentVote);

        this.setVoteBtnStates();


        this.vote.emit({
            selectedVote: this.selectedVote,
            totalVotes: this.totalVotes
        });
    }

    /**
     * Sets selected and disabled state of each defined NgVoteBtnComponent by defined child-selector
     */
    setVoteBtnStates() {
        this.ngVoteBtnInstances
            .forEach((instance) => {
                instance.setState({
                    selected: this.selectedVote === this.getVoteValueByChildSelector(instance.selector),
                    disabled: !this.isVotingEnabled()
                })
            })
    }

    calculateVote(currentVote:number) {
         if (!this.hasVoted()) {
            // add vote if not voted yet
            this.addVote(currentVote);
        } else {
            let isBtnSelected = this.selectedVote === currentVote;

            // reset current vote
            this.totalVotes -= this.selectedVote;
            this.selectedVote = 0;

            if (!isBtnSelected) {
                // add vote if vote button isn't already selected
                this.addVote(currentVote)
            }
        }
    }

    addVote(currentVote) {
        this.selectedVote = currentVote;
        this.totalVotes += currentVote;
    }

    isVotingEnabled():boolean {
        return !this.config.disabled && (!this.hasVoted() || this.config.allowEdit);
    }

    hasVoted():boolean {
        // 0 -> false, -1, 1 -> true
        return !!this.selectedVote;
    }

    getVoteValueByChildSelector(selector:string) {
        return selector === 'ng-vote-up' ? voteTypes.upVote : voteTypes.downVote
    }

}
