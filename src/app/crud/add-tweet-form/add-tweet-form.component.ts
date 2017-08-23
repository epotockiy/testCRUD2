import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrudService } from '../services/crud.service';
import { TweetsService } from '../services/tweets.service';

import { Tweet } from '../models/tweet';

@Component({
  selector: 'app-add-tweet-form',
  templateUrl: './add-tweet-form.component.html',
  styleUrls: ['./add-tweet-form.component.scss'],
  providers: [TweetsService]
})

export class AddTweetFormComponent {
  addTweetForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _crudService: CrudService,
    private _tweetsService: TweetsService
  ) {
    this.addTweetForm = this._formBuilder.group({
      'tweetTitle': [null, Validators.required],
      'tweetBody': [null, Validators.required]
    });
  }

  addNewTweet(tweet: Tweet) {
    this._crudService.addTweet(tweet)
      .subscribe(
        data => {
          this._tweetsService.addLocalTweet(tweet);
        },
        error => {
          console.log(error);
        }
      );
  }

  onSubmit(tweet) {
    const newTweet = {
      id: Math.floor(Math.random() * 100),
      userId: Math.floor(Math.random() * 100),
      title: tweet.tweetTitle,
      body: tweet.tweetBody
    };
    this.addNewTweet(newTweet);
    this.addTweetForm.reset();
  }
}
