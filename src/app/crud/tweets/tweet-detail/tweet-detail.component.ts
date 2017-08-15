import { Component, OnInit } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';

import { CrudService       } from '../../services/crud.service';
import { Tweet             } from '../../models/tweet';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent implements OnInit {
  tweet: Tweet;

  constructor(private _crudService: CrudService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTweet();
  }

  getTweet() {
    this._crudService.getTweet(+this._activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.tweet = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
