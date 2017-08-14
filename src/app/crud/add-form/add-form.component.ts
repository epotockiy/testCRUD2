import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tweet                              } from '../models/tweet';
import { CrudService                        } from '../services/crud.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Output() addNewTweet: EventEmitter<Tweet> = new EventEmitter<Tweet>();

  newTweet: Tweet;
  addForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _crudService: CrudService) {
    this.addForm = this._formBuilder.group({
      'tweetTitle': [null, Validators.required],
      'tweetBody': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(tweet) {
    this.newTweet = {
      id: Math.floor(Math.random() * 1000),
      userId: Math.floor(Math.random() * 100),
      title: tweet.tweetTitle,
      body: tweet.tweetBody
    };

    this._crudService.addTweet(this.newTweet)
      .subscribe(
        data => {
          this.addNewTweet.emit(this.newTweet);
        },
        error => {
          console.log(error);
        }
      );
  }
}
