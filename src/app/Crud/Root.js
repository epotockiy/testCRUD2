import React                   from 'react';
import { Route, Redirect     } from 'react-router-dom';
import { Header              } from './components/Header';
import { UserList            } from './components/UserList';
import AddTweetForm            from './components/AddTweetForm';
import EditTweet               from './components/EditTweet';
import User                    from './components/User';
import TweetList               from './components/TweetList';
import TweetDetail             from './components/TweetDetail';

export class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />

        <div>
          <Redirect from={'/'} to={'/tweets'} />
          <Route path={'/tweets'}           component={TweetList} />
          <Route path={'/tweet-detail/:id'} component={TweetDetail} />
          <Route path={'/create'}           component={AddTweetForm} />
          <Route path={'/users'}            component={UserList}/>
          <Route path={'/user/:id'}         component={User} />
          <Route path={'/edit'}             component={EditTweet} />
        </div>
      </div>
    );
  }
}
