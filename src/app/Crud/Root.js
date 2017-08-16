import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Header          } from './Header';
import { TweetList       } from './TweetList';
import { TweetDetail     } from './TweetDetail';
import { AddTweetForm    } from './AddTweetForm';

export class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />

        <div>
          <Redirect from={'/'} to={'/tweets'} />
          <Route path={'/tweets'} component={TweetList} />
          <Route path={'/tweet-detail/:id'} component={TweetDetail} />
          <Route path={'/create'} component={AddTweetForm} />
        </div>
      </div>
    );
  }
}
