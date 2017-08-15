import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router                  } from '@angular/router';

import { CrudService                             } from '../../services/crud.service';
import { Tweet                                   } from '../../models/tweet';
import { Comment                                 } from '../../models/comment';
import { User                                    } from '../../models/user';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent implements OnInit {
  @Output() deleteTweet: EventEmitter<number> = new EventEmitter<number>();

  tweet: Tweet;
  comments: Comment[];
  user: User;

  isDataLoaded   = false;
  isTitleEditing = false;
  isBodyEditing  = false;
  tweetTitle: string;
  tweetBody:  string;

  constructor(private _crudService: CrudService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTweet();
  }

  goBack() {
    this._router.navigate(['/tweets']);
  }

  getTweet() {
    this._crudService.getTweet(+this._activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.tweet = data;

          this.getComments();
          this.getUser();

          this.tweetTitle = this.tweet.title;
          this.tweetBody  = this.tweet.body;
        },
        error => {
          console.log(error);
        }
      );
  }

  getComments() {
    this._crudService.getTweetComments(+this._activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.comments = data;
          this.isDataLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  updateTweet() {
    this._crudService.updateTweet(this.tweet)
      .subscribe(
        data => {
          /**/
        },
        error => {
          console.log(error);
        }
      );
  }

  onEditTitleClick(event) {
    event.preventDefault();

    if (this.isTitleEditing) {
      this.updateTweet();
    }

    if (this.tweetTitle.length) {
      this.tweet.title = this.tweetTitle;
    } else {
      this.tweetTitle = this.tweet.title;
    }
    this.isTitleEditing = !this.isTitleEditing;
  }

  onEditBodyClick(event) {
    event.preventDefault();

    if (this.isBodyEditing) {
      this.updateTweet();
    }

    if (this.tweetBody.length) {
      this.tweet.body = this.tweetBody;
    } else {
      this.tweetBody = this.tweet.body;
    }
    this.isBodyEditing = !this.isBodyEditing;
  }

  onUpdateComment(comment: Comment) {
    this._crudService.updateComment(comment)
      .subscribe(
        data => {
          for (let i = 0; i < this.comments.length; ++i) {
            if (this.comments[i].id === comment.id) {
              this.comments[i] = comment;
              break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getUser() {
    this._crudService.getUser(this.tweet.userId)
      .subscribe(
        data => {
          this.user = data;
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
          for (let i = 0; i < this.comments.length; ++i) {
            if (this.comments[i].id === id) {
              this.comments.splice(i, 1);
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
