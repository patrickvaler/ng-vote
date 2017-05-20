import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgVoteComponent} from './containers/ng-vote/ng-vote.component';
import {NgVoteCountComponent} from './components/ng-vote-count/ng-vote-count.component';
import {NgVoteBtnComponent} from './components/ng-vote-btn/ng-vote-btn.component';

export * from './containers/ng-vote/ng-vote.component';
export * from './components/ng-vote-btn/ng-vote-btn.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgVoteComponent,
        NgVoteCountComponent,
        NgVoteBtnComponent
    ],
    exports: [
        NgVoteComponent,
        NgVoteBtnComponent
    ]
})
export class NgVoteModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: NgVoteModule,
            providers: []
        };
    }
}
