import { Component, Input, OnInit } from '@angular/core';
import { Comment                  } from '../models/comment';
import { CrudService              } from '../services/crud.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() title: string;
  @Input() body:  string;
  @Input() id:    number;

  comments: Comment[];

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
    // this.getCommentsForTweet();
  }

  // getCommentsForTweet() {
  //   this._crudService.getComments()
  //     .subscribe(
  //       data => {
  //         for (let i = 0; i < data.length; ++i) {
  //           if (data[i].postId === this.id) {
  //             this.comments.push(data[i]);
  //           }
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
}
