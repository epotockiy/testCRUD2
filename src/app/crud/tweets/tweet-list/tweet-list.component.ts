import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Tweet } from '../../models/tweet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  tweetList: Tweet[];
  isDataLoaded = false;

  constructor(private _crudService: CrudService,
              private _router: Router) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
    this._crudService.getTweets()
      .subscribe(
        data => {
          this.tweetList = data;
          this.isDataLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  onEditClick(event, id: number) {
    event.preventDefault();
    this._router.navigate(['/tweet-detail', id + 1]);
  }

  onDeleteClick(event, id: number) {
    event.preventDefault();
  }
}
