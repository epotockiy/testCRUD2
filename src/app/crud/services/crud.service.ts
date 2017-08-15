import { Injectable     } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable     } from 'rxjs/Rx';
import { Tweet          } from '../models/tweet';
import { Comment        } from '../models/comment';
import { contentHeaders } from './headers';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService {
  constructor(private _http: Http) { }

  getTweets (): Observable<Tweet[]> {
    const url = `http://jsonplaceholder.typicode.com/posts`;

    return this._http.get(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTweet (id: number): Observable<Tweet> {
    const url = `http://jsonplaceholder.typicode.com/posts/${id}`;

    return this._http.get(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTweetComments(id: number): Observable<Comment[]> {
    const url = `http://jsonplaceholder.typicode.com/posts/${id}/comments`;

    return this._http.get(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addTweet (tweet: Tweet): Observable<any> {
    console.log('adding tweets: ', tweet);
    const url = `http://jsonplaceholder.typicode.com/posts`;

    return this._http.post(url, JSON.stringify(tweet), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateTweet (tweet: Tweet): Observable<any> {
    console.log('updating tweets: ', tweet);
    const url = `http://jsonplaceholder.typicode.com/posts/1`;

    return this._http.put(url, JSON.stringify(tweet), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteTweet (id: number): Observable<any> {
    console.log('deleting tweets #' + id);
    const url = `http://jsonplaceholder.typicode.com/posts/1`;

    return this._http.delete(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getComments () {
    const url = `http://jsonplaceholder.typicode.com/comments`;

    return this._http.get(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addComment (comment: Comment): Observable<any> {
    console.log('adding comment:', comment);
    const url = `http://jsonplaceholder.typicode.com/posts`;

    return this._http.post(url, JSON.stringify(comment), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateComment (comment: Comment): Observable<any> {
    console.log('updating comment:', comment);
    const url = `http://jsonplaceholder.typicode.com/posts/1`;

    return this._http.put(url, JSON.stringify(comment), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteComment (id: number): Observable<any> {
    console.log('deleting comment #' + id);
    const url = `http://jsonplaceholder.typicode.com/posts/1`;

    return this._http.delete(url, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errorMsg: string;
    if (error instanceof Response) {
      try {
        errorMsg = error.json();
      } catch (e) {
        errorMsg = null;
      }
    }

    console.log(errorMsg);

    return Observable.throw(errorMsg);
  }
}
