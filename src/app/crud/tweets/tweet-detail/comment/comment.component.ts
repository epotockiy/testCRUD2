import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment                  } from '../../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  @Input()  comment:       Comment;
  @Output() updateComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() deleteComment: EventEmitter<number>  = new EventEmitter<number>();

  isEditing = false;
  newComment: string;

  constructor() { }

  ngOnInit() {
    this.newComment = this.comment.body;
  }

  onEditClick(event) {
    event.preventDefault();

    if (this.isEditing) {
      this.updateComment.emit(this.comment);
    }

    if (this.newComment.length) {
      this.comment.body = this.newComment;
    } else {
      this.newComment = this.comment.body;
    }
    this.isEditing = !this.isEditing;
  }

  onDeleteClick(event) {
    event.preventDefault();

    this.deleteComment.emit(this.comment.id);
  }
}
