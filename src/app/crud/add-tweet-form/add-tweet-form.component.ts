import { Component, EventEmitter, Output    } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tweet                              } from '../models/tweet';

@Component({
  selector: 'app-add-tweet-form',
  templateUrl: './add-tweet-form.component.html',
  styleUrls: ['./add-tweet-form.component.scss']
})
export class AddTweetFormComponent {
  @Output() addNewTweet: EventEmitter<Tweet> = new EventEmitter<Tweet>();

  addTweetForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.addTweetForm = this._formBuilder.group({
      'tweetTitle': [null, Validators.required],
      'tweetBody': [null, Validators.required]
    });
  }

  onSubmit(tweet) {
    const newTweet = {
      id: Math.floor(Math.random() * 100),
      userId: Math.floor(Math.random() * 100),
      title: tweet.tweetTitle,
      body: tweet.tweetBody
    };

    this.addNewTweet.emit(newTweet);
    this.addTweetForm.reset();
  }
}
