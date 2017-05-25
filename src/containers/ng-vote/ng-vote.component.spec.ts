import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By }              from '@angular/platform-browser';
import { DebugElement, SimpleChange, QueryList }    from '@angular/core';

import { NgVoteComponent, ngVoteDefaultConfig, voteTypes } from './ng-vote.component';
import { NgVoteBtnComponent } from '../../components/ng-vote-btn/ng-vote-btn.component';
import { NgVoteCountComponent } from '../../components/ng-vote-count/ng-vote-count.component';

describe('NgVoteComponent', () => {
    let comp:NgVoteComponent;
    let fixture:ComponentFixture<NgVoteComponent>;
    let de:DebugElement;
    let el:HTMLElement;

    beforeEach(async(() => {
        return TestBed
            .configureTestingModule({
                declarations: [NgVoteComponent, NgVoteBtnComponent, NgVoteCountComponent] // declare the test component
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(NgVoteComponent)
                comp = fixture.componentInstance;
            });

    }));
    
    describe('onInit()', () => {
        it('should set the correct default values', () => {
            comp.config = undefined;
            comp.totalVotes = undefined;
            comp.selectedVote = undefined;

            comp.ngOnInit();

            expect(comp.config).toEqual(ngVoteDefaultConfig);
            expect(comp.totalVotes).toBe(0);
            expect(comp.selectedVote).toBe(voteTypes.none);
        });

        it('should set the correct @Input values', () => {
            let expectedTotalVotes = 100;
            let expectedSelectedVote = 1;
            let expectedConfig = {
                disabled: true,
                allowEdit: false,
                cssClass: 'my-css-class'
            };

            comp.totalVotes = expectedTotalVotes;
            comp.selectedVote = expectedSelectedVote;
            comp.config = expectedConfig;

            comp.ngOnInit();

            expect(comp.config).toEqual(expectedConfig);
            expect(comp.totalVotes).toBe(expectedTotalVotes);
            expect(comp.selectedVote).toBe(expectedSelectedVote);
        });
    });
    
    describe('onChanges()', () => {
        it('should set the correct fallback values', () => {

            let expectedTotalVotes = 0;
            let expectedSelectedVote = 0;
            let expectedConfig = {
                disabled: false,
                allowEdit: true,
                cssClass: ''
            };

            comp.totalVotes = expectedTotalVotes;
            comp.selectedVote = expectedSelectedVote;
            comp.config = expectedConfig;

            comp.ngOnChanges({
                totalVotes: new SimpleChange(undefined, null, false),
                selectedVote: new SimpleChange(undefined, null, false),
                config: new SimpleChange(undefined, null, false),
            });

            fixture.detectChanges();

            expect(comp.config).toEqual(expectedConfig);
            expect(comp.totalVotes).toBe(expectedTotalVotes);
            expect(comp.selectedVote).toBe(expectedSelectedVote);
        });
        it('should set the correct @Input values', () => {

            let expectedTotalVotes = 100;
            let expectedSelectedVote = 1;
            let expectedConfig = {
                disabled: true,
                allowEdit: false,
                cssClass: 'my-css-class'
            };

            comp.totalVotes = expectedTotalVotes;
            comp.selectedVote = expectedSelectedVote;
            comp.config = expectedConfig;

            comp.ngOnChanges({
                totalVotes: new SimpleChange(undefined, expectedTotalVotes, false),
                selectedVote: new SimpleChange(undefined, expectedSelectedVote, false),
                config: new SimpleChange(undefined, expectedConfig, false),
            });

            fixture.detectChanges();

            expect(comp.config).toEqual(expectedConfig);
            expect(comp.totalVotes).toBe(expectedTotalVotes);
            expect(comp.selectedVote).toBe(expectedSelectedVote);
        });
    });

    
    it('should calculate upvote', () => {
        comp.totalVotes = 100;
        comp.selectedVote = 0;
        comp.calculateVote(1);

        fixture.detectChanges();

        expect(comp.totalVotes).toBe(101);
        expect(comp.selectedVote = 1);
    });
    
    it('should reset upvote', () => {
        comp.totalVotes = 100;
        comp.selectedVote = 1;
        comp.calculateVote(1);
        
        fixture.detectChanges();
        
        expect(comp.totalVotes).toBe(99);
        expect(comp.selectedVote).toBe(0);
        
    });

    it('should reset upvote and set downvote', () => {
        comp.totalVotes = 100;
        comp.selectedVote = 1;
        comp.calculateVote(-1);

        fixture.detectChanges();

        expect(comp.totalVotes).toBe(98);
        expect(comp.selectedVote).toBe(-1);
    });

    it('should calculate downVote', () => {
        comp.totalVotes = 100;
        comp.selectedVote = 0;
        comp.calculateVote(-1);

        fixture.detectChanges();

        expect(comp.totalVotes).toBe(99);
        expect(comp.selectedVote = -1);
    });

    it('should emit vote event onVote', () => {
        comp.ngOnInit();

        comp.totalVotes = 123;
        comp.selectedVote = 0;

        spyOn(comp, 'isVotingEnabled').and.callThrough();
        spyOn(comp, 'calculateVote').and.callThrough();
        spyOn(comp, 'setVoteBtnStates').and.callFake(() => null);
        spyOn(comp.vote, 'emit').and.callThrough();

        comp.onVote(1);
        fixture.detectChanges();

        expect(comp.isVotingEnabled).toHaveBeenCalled();
        expect(comp.calculateVote).toHaveBeenCalled();
        expect(comp.setVoteBtnStates).toHaveBeenCalled();
        expect(comp.vote.emit).toHaveBeenCalledWith({
            totalVotes: 124,
            selectedVote: 1
        });

    });
    
    it('should not execute onVote if voting is disabled', () => {
        comp.config = {
            disabled: true,
            allowEdit: true
        };

        comp.totalVotes = 111;
        comp.selectedVote = 1;

        spyOn(comp, 'isVotingEnabled').and.callThrough();
        spyOn(comp, 'calculateVote').and.callThrough();
        spyOn(comp, 'setVoteBtnStates').and.callFake(() => null);
        spyOn(comp.vote, 'emit').and.callThrough();

        comp.onVote(1);
        fixture.detectChanges();

        expect(comp.isVotingEnabled).toHaveBeenCalled();
        expect(comp.calculateVote).not.toHaveBeenCalled();
        expect(comp.setVoteBtnStates).not.toHaveBeenCalled();
        expect(comp.vote.emit).not.toHaveBeenCalled();
        expect(comp.totalVotes).toBe(111);
        expect(comp.selectedVote).toBe(1);
    });

    it('should not execute onVote fully if already voted and editing is not allowed', () => {
        comp.config = {
            disabled: false,
            allowEdit: false
        };
        comp.totalVotes = 111;
        comp.selectedVote = 1;

        spyOn(comp, 'isVotingEnabled').and.callThrough();
        spyOn(comp, 'calculateVote').and.callThrough();
        spyOn(comp, 'setVoteBtnStates').and.callThrough();
        spyOn(comp.vote, 'emit').and.callThrough();

        comp.onVote(1);
        fixture.detectChanges();

        expect(comp.isVotingEnabled).toHaveBeenCalled();
        expect(comp.calculateVote).not.toHaveBeenCalled();
        expect(comp.setVoteBtnStates).not.toHaveBeenCalled();
        expect(comp.vote.emit).not.toHaveBeenCalled();
        expect(comp.totalVotes).toBe(111);
        expect(comp.selectedVote).toBe(1);
    })

    it('should return the correct vote type value by selector', () => {
        let expectedKeyValue = {
            'ng-vote-up': 1,
            'ng-vote-down': -1
        };

        Object.keys(expectedKeyValue)
            .forEach((selector) => {
                let res = comp.getVoteValueByChildSelector(selector)
                expect(res).toBe(expectedKeyValue[selector]);
            })
    })

});