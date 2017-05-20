[![npm version](https://badge.fury.io/js/ng-vote.svg)](http://badge.fury.io/js/ng-vote) [![Build Status](https://travis-ci.org/patrickvaler/ng-vote.svg?branch=master)](https://travis-ci.org/patrickvaler/ng-vote) [![Dependency Status](https://david-dm.org/patrickvaler/ng-vote/status.svg?style=flat)](https://david-dm.org/patrickvaler/ng-vote)


ng-vote
=======

Simple & lightweight Angular 2 vote component. Demo is available on [Plunker][plunkerDemo].

![ng-vote demo][demo]

## Installation

To install ng-vote, run:

```bash
$ npm install ng-vote --save
```

## Usage
Import `NgVoteModule` into your Angular application:

```typescript

// Import ng-vote
import { NgVoteModule } from 'ng-vote';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify ng-vote as an import
    NgVoteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once ng-vote is imported, you can use it in your Angular application:

```typescript

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    voteConfig: {
      cssClass: 'my-class',
      allowEdit: true, 
      disabled: false
    }
    votes: 123, // total amount of votes
    selectedVote: 0 // not voted yet

  onVote(vote) {
    console.log('onVote response: ', vote)
  }
}
```

```html
<!-- You can now use ng-vote component in your application -->
<ng-vote 
  (vote)="onVote($event)" 
  [totalVotes]="votes" 
  [selectedVote]="selectedVote" 
  [config]="voteConfig">
    <!-- Define Up Vote Button -->
    <ng-vote-up>
      <!-- Content will be projected -->
      <i class="my-up-icon"></i>Up
    </ng-vote-up>
    <!-- Add Down Vote Button -->
    <ng-vote-down>Down</ng-vote-down>
</ng-vote> 

<!-- Minimal setup would be -->
<ng-vote (vote)="onVote($event)">
    <ng-vote-up>Up</ng-vote-up>
    <ng-vote-down>Down</ng-vote-down>
</ng-vote>
```

## Bindings
### ng-vote
#### @Input

* **[totalVotes]**: number `Default: 0`
* **[selectedVote]**: number `Default: 0`
_One of -1 (downVote), 0 (not voted), 1 (upVote)_
* **[config]**: Object
    * **allowEdit**: boolean `Default: true`
        _Defines if user is allowed to change his the selection._
    * **disabled**: boolean `Default: false`
        _Disables vote functionality._
    * **cssClass**: string `Default: ''`
        _Sets custom css class to override styles._
        
        
#### @Output
* **(vote)**: Object
    * **selectedVote**: number
    * **totalVotes**: number

### ng-vote-up / ng-vote-down
No bindings available for `<ng-vote-up>` / `<ng-vote-down>`. Content will be projected to the `<button>`.

## Demo
Demo is available on [Plunker][plunkerDemo].

## License

*The MIT License (MIT)*

Copyright (c) 2017 Patrick Valer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---
Made with ♥ by [Patrick Valer]("http://www.patrickvaler.ch") (<hello@patrickvaler.ch>)

[plunkerDemo]: https://plnkr.co/edit/Gz4LszNzdUfWYe1bLoGA?p=preview "ng-vote demo on Plunker"
[demo]: https://image.ibb.co/niY4kv/ng_vote_demo.gif "ng-vote demo"
