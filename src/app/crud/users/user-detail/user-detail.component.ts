import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router                  } from '@angular/router';

import { CrudService                             } from '../../services/crud.service';
import { User                                    } from '../../models/user';
import { Tweet                                   } from '../../models/tweet';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {

  user: User;
  userTweets: Tweet[];

  isUserLoaded = false;
  isUserTweetsLoaded = false;
  userId = null;

  constructor(private _crudService: CrudService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this.userId = +this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUser();
    this.getUserTweets();
  }

  goBack() {
    this._router.navigate(['/users']);
  }

  getUser() {
    this._crudService.getUser(this.userId)
      .subscribe(
        data => {
          this.user = data;
          this.isUserLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserTweets() {
    this._crudService.getUserTweets(this.userId)
      .subscribe(
        data => {
          this.userTweets = data;
          this.isUserTweetsLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  onDetailsClick(event, id: number) {
    event.preventDefault();
    this._router.navigate(['/tweet-detail', id]);
  }

  onDeleteClick(event, id: number) {
    event.preventDefault();
    const { userTweets } = this;

    this._crudService.deleteTweet(id)
      .subscribe(
        data => {
          for (let i = 0; i < userTweets.length; ++i) {
            if (userTweets[i].id === id) {
              userTweets.splice(i, 1);
              break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
