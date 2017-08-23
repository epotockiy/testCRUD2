import { Injectable } from '@angular/core';

import { Tweet } from '../models/tweet';

const LOCAL_TWEETS: Tweet[] = [];

@Injectable()
export class TweetsService {
  getLocalTweets(): Promise<Tweet[]> {
    return Promise.resolve(LOCAL_TWEETS);
  }

  addLocalTweet(tweet: Tweet): void {
    LOCAL_TWEETS.push(tweet);
  }
}
