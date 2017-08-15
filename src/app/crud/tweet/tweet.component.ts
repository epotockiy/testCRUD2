import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CrudService              } from '../services/crud.service';
import { Comment                  } from '../models/comment';
import { Tweet                    } from '../models/tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
    this.newTweetTitle = this.tweet.title;
    this.newTweetBody  = this.tweet.body;
  }

  onEditTitleClick(event) {
    event.preventDefault();

    if (this.isTitleEditing) {
      this.updateTweet.emit(this.tweet);
    }

    if (this.newTweetTitle.length) {
      this.tweet.title = this.newTweetTitle;
    }
    this.newTweetTitle = this.tweet.title;
    this.isTitleEditing = !this.isTitleEditing;
  }

  onEditBodyClick(event) {
    event.preventDefault();

    if (this.isBodyEditing) {
      this.updateTweet.emit(this.tweet);
    }

    if (this.newTweetBody.length) {
      this.tweet.title = this.newTweetBody;
    }
    this.newTweetBody = this.tweet.title;
    this.isBodyEditing = !this.isBodyEditing;
  }

  onDeleteClick(event) {
    event.preventDefault();

    this.deleteTweet.emit(this.tweet.id);
  }
}
