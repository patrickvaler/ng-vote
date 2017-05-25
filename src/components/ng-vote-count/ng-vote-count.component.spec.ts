import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { NgVoteComponent } from '../../containers/ng-vote/ng-vote.component';
import { NgVoteBtnComponent } from '../ng-vote-btn/ng-vote-btn.component';
import { NgVoteCountComponent } from './ng-vote-count.component';

describe('NgVoteCountComponent', () => {
    let comp:    NgVoteCountComponent;
    let fixture: ComponentFixture<NgVoteCountComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(async(() => {
        return TestBed
            .configureTestingModule({
                declarations: [ NgVoteComponent, NgVoteBtnComponent, NgVoteCountComponent ] // declare the test component
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(NgVoteCountComponent)
                comp = fixture.componentInstance;
                comp.count = 0;
            });

    }));

    it('should set count @Input in template', () => {
        // set input value
        let expectedCount = 1234;
        el = fixture.debugElement.query(By.css('.ng-vote-count')).nativeElement;

        comp.count = expectedCount;
        fixture.detectChanges();

        expect(el.textContent).toContain(expectedCount);
    });

});
