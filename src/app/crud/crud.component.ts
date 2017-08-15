import { Component, OnInit } from '@angular/core';

import { CrudService       } from './services/crud.service';
import { Tweet             } from './models/tweet';
import { Comment           } from './models/comment';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  tweetList:   Tweet[];
  commentList: Comment[];

  isDataLoaded = false;

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
    this.getTweets();
    this.getComments();
  }

  getTweets() {
    this._crudService.getTweets()
      .subscribe(
        data => {
          this.tweetList = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getComments() {
    this._crudService.getComments()
      .subscribe(
        data => {
          this.commentList = data;
          this.isDataLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  getCommentsForTweet(id: number) {
    return this.commentList.filter(comment => comment.postId === id);
  }

  onAddNewComment(comment: Comment) {
    this.commentList.unshift(comment);
  }

  onDeleteComment(id: number) {
    for (let i = 0; i < this.commentList.length; ++i) {
      if (this.commentList[i].id === id) {
        this.commentList.splice(i, 1);
        return;
      }
    }
  }

  onAddNewTweet(tweet) {
    this._crudService.addTweet(tweet)
      .subscribe(
        data => {
          this.tweetList.unshift(tweet);
        },
        error => {
          console.log(error);
        }
      );
  }
}
