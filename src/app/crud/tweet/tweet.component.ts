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
  @Output() addNewComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() deleteComment: EventEmitter<number>  = new EventEmitter<number>();

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
  }

  onAddComment(comment) {
    this._crudService.addComment(comment)
      .subscribe(
        data => {
          this.addNewComment.emit(comment);
        },
        error => {
          console.log(error);
        }
      );
  }

  onUpdateComment(comment) {
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

  onDeleteComment(id) {
    this._crudService.deleteComment(id)
      .subscribe(
        data => {
          this.deleteComment.emit(id);
        },
        error => {
          console.log(error);
        }
      );
  }
}
