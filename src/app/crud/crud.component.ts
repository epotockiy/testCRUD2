import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { Tweet } from './models/tweet';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
  }

  onGetTest() {
    this._crudService.getTweets()
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  onPostTest() {
    const tweet: Tweet[] = [{title: 'asd1', id: 1, userId: 3, body: 'wqefw###ef'}];
    this._crudService.postTweets(tweet)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }


  onUpdateTest() {
    const tweet: Tweet = {title: 'asd2', id: 2, userId: 3, body: 'wqefwef'};
    this._crudService.updateTweet(2, tweet)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  onDeleteTest() {
    this._crudService.deleteTweet(5)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }
}
