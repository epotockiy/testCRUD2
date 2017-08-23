import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { TweetsService } from '../../services/tweets.service';
import { Tweet } from '../../models/tweet';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
  providers: [TweetsService]
})
export class TweetListComponent implements OnInit {
  tweetList: Tweet[];
  isDataLoaded = false;

  constructor(
    private _crudService: CrudService,
    private _tweetsService: TweetsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
    this._crudService.getTweets()
      .subscribe(
        tweets => {
          this._tweetsService.getLocalTweets().then(localTweets => {
            this.tweetList = localTweets.concat(tweets);
            this.isDataLoaded = true;
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  onDetailsClick(event, id: number) {
    event.preventDefault();
    this._router.navigate(['/tweet-detail', id]);
  }

  onDeleteClick(event, id: number) {
    event.preventDefault();

    this._crudService.deleteTweet(id)
      .subscribe(
        data => {
          for (let i = 0; i < this.tweetList.length; ++i) {
            if (this.tweetList[i].id === id) {
              this.tweetList.splice(i, 1);
              break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
