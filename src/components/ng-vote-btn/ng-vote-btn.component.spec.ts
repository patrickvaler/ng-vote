import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { NgVoteComponent } from '../../containers/ng-vote/ng-vote.component';
import { NgVoteBtnComponent, ngVoteBtnDefaultState } from './ng-vote-btn.component';
import { NgVoteCountComponent } from '../ng-vote-count/ng-vote-count.component';
import { INgVoteBtnState } from '../../models/ng-vote-btn-state.interface';

describe('NgVoteCountComponent', () => {
    let comp:    NgVoteBtnComponent;
    let fixture: ComponentFixture<NgVoteBtnComponent>;
    let de:      DebugElement;
    let mockedSelector:string = 'ng-vote-up';

    beforeEach(async(() => {
        return TestBed
            .configureTestingModule({
                declarations: [ NgVoteComponent, NgVoteBtnComponent, NgVoteCountComponent ] // declare the test component
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(NgVoteBtnComponent);
                comp = fixture.componentInstance;
                comp.selector = mockedSelector;
            });

    }));

    it('should initialize the default state', () => {
        expect(comp.state).toBe(ngVoteBtnDefaultState);
    });

    it('should set a new state by setState method', () => {
        let expectedState:INgVoteBtnState = {
            disabled: true,
            selected: true
        };

        comp.setState(expectedState);

        expect(comp.state).toEqual(expectedState);
    });

    it('should call the output by clicking on the button', () => {
        de = fixture.debugElement.query(By.css('button'));

        spyOn(comp.voted, 'emit').and.callThrough();
        spyOn(comp, 'onClick').and.callThrough();

        de.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(comp.onClick).toHaveBeenCalled();
        expect(comp.voted.emit).toHaveBeenCalledWith(mockedSelector)

    });

});
