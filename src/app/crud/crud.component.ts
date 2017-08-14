import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { Tweet } from './models/tweet';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  tweetList: Tweet[];

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
    this._crudService.getTweets()
      .subscribe(
        data => {
          this.tweetList = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  onAddNewTweet(tweet) {
    this.tweetList.unshift(tweet);
  }
}
