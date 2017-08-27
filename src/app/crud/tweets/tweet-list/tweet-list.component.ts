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
  allTweets: Tweet[];
  isDataLoaded = false;
  hasMoreTweets = true;
  page = 0;
  itemsPerPage = 10;

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
            const _tweets = localTweets.concat(tweets);
            this.allTweets = localTweets.concat(tweets);
            this.tweetList = _tweets.splice(0, this.itemsPerPage);
            this.isDataLoaded = true;
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  onScroll() {
    const { allTweets, tweetList, page, itemsPerPage } = this;
    const newTweets = allTweets.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    if (allTweets.length && !newTweets.length) {
      this.hasMoreTweets = false;
      return;
    }

    this.tweetList = [
      ...tweetList,
      ...newTweets
    ];
    this.page = page + 1;
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
