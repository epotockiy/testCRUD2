import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrudService } from '../services/crud.service';
import { TweetsService } from '../services/tweets.service';

import { Tweet } from '../models/tweet';
import { User } from '../models/user';

@Component({
  selector: 'app-add-tweet-form',
  templateUrl: './add-tweet-form.component.html',
  styleUrls: ['./add-tweet-form.component.scss'],
  providers: [TweetsService]
})

export class AddTweetFormComponent implements OnInit {
  addTweetForm: FormGroup;
  usersList: User[];
  isUsersLoaded = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _crudService: CrudService,
    private _tweetsService: TweetsService
  ) {
    this.addTweetForm = this._formBuilder.group({
      'tweetTitle': [null, Validators.required],
      'tweetBody': [null, Validators.required],
      'tweetOwner': [null, Validators.required]
    });
  }
  ngOnInit() {
    this._crudService.getUsers()
      .subscribe(
        users => {
          this.usersList = users;
          this.isUsersLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
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
      userId: tweet.tweetOwner,
      title: tweet.tweetTitle,
      body: tweet.tweetBody
    };
    this.addNewTweet(newTweet);
    this.addTweetForm.reset();
  }
}
