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
    this.getComments();
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
    this._crudService.addComment(comment)
      .subscribe(
        data => {
          this.commentList.unshift(comment);
        },
        error => {
          console.log(error);
        }
      );
  }

  onUpdateComment(comment: Comment) {
    this._crudService.updateComment(comment)
      .subscribe(
        data => {
          for (let i = 0; i < this.commentList.length; ++i) {
            if (this.commentList[i].id === comment.id) {
              this.commentList[i] = comment;
              break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  onDeleteComment(id: number) {
    this._crudService.deleteComment(id)
      .subscribe(
        data => {
          for (let i = 0; i < this.commentList.length; ++i) {
            if (this.commentList[i].id === id) {
              this.commentList.splice(i, 1);
              return;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  onAddNewTweet(tweet: Tweet) {
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

  onUpdateTweet (tweet: Tweet) {
    this._crudService.updateTweet(tweet)
      .subscribe(
        data => {
          for (let i = 0; i < this.tweetList.length; ++i) {
            if (this.tweetList[i].id === tweet.id) {
              this.tweetList[i] = tweet;
              break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  onDeleteTweet (id: number) {
    this._crudService.deleteTweet(id)
      .subscribe(
        data => {
          for (let i = 0; i < this.tweetList.length; ++i) {
            if (this.tweetList[i].id === id) {
              this.tweetList.splice(i, 1);
              return;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
