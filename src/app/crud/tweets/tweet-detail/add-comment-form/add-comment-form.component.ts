import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators     } from '@angular/forms';

import { Comment                                } from '../../../models/comment';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss']
})
export class AddCommentFormComponent {
  @Input() postId: number;
  @Output() addComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  addCommentForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.addCommentForm = this._formBuilder.group({
      'commentTitle': [null, Validators.required],
      'commentBody':  [null, Validators.required]
    });
  }

  onSubmit(comment) {
    const newComment: Comment = {
      id: Math.floor(Math.random() * 100),
      postId: this.postId,
      name: comment.commentTitle,
      body: comment.commentBody,
      email: Math.random().toString(32).substr(2, 10)
    };

    console.log(newComment);
    this.addComment.emit(newComment);
    this.addCommentForm.reset();
  }
}
