import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  // @Input() comments: Comment[];

  constructor() { }

  ngOnInit() {
  }

}
