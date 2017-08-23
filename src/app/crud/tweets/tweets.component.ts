import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CrudService              } from '../services/crud.service';
import { Comment                  } from '../models/comment';
import { Tweet                    } from '../models/tweet';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  @Input()  tweet:         Tweet;
  @Input()  comments:      Comment[];
  @Output() updateTweet: EventEmitter<Tweet> = new EventEmitter<Tweet>();
  @Output() deleteTweet: EventEmitter<number>  = new EventEmitter<number>();
  @Output() addNewComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() updateComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() deleteComment: EventEmitter<number>  = new EventEmitter<number>();

  isTitleEditing = false;
  isBodyEditing  = false;
  newTweetTitle: string;
  newTweetBody:  string;

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
    this.newTweetTitle = this.tweet.title;
    this.newTweetBody  = this.tweet.body;
  }

  addNewTweet(tweet: Tweet) {
    this._crudService.addTweet(tweet)
      .subscribe(
        data => {
          /*this.comments.unshift(comment);*/
        },
        error => {
          console.log(error);
        }
      );
      console.log(tweet);
  }

  onEditTitleClick(event) {
    event.preventDefault();

    if (this.isTitleEditing) {
      this.updateTweet.emit(this.tweet);
    }

    if (this.newTweetTitle.length) {
      this.tweet.title = this.newTweetTitle;
    } else {
      this.newTweetTitle = this.tweet.title;
    }
    this.isTitleEditing = !this.isTitleEditing;
  }

  onEditBodyClick(event) {
    event.preventDefault();

    if (this.isBodyEditing) {
      this.updateTweet.emit(this.tweet);
    }

    if (this.newTweetBody.length) {
      this.tweet.body = this.newTweetBody;
    } else {
      this.newTweetBody = this.tweet.body;
    }
    this.isBodyEditing = !this.isBodyEditing;
  }

  onDeleteClick(event) {
    event.preventDefault();

    this.deleteTweet.emit(this.tweet.id);
  }
}
