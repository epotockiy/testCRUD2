import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header        } from './components/Header';
import { UserList      } from './components/UserList';
import { NotFound      } from './components/NotFound';
import TweetForm         from './components/TweetForm';
import AddTweetForm      from './components/AddTweetForm';
import EditTweet         from './components/EditTweet';
import User              from './components/User';
import TweetList         from './components/TweetList';
import TweetDetail       from './components/TweetDetail';

export const Root = () => {
  return (
    <div className="container">
      <Header />

      <Switch>
        <Route path='/tweets'           component={TweetList} />
        <Route path='/tweet-detail/:id' component={TweetDetail} />
        <Route path='/create'           component={AddTweetForm} />
        <Route path='/users'            component={UserList} />
        <Route path='/user/:id'         component={User} />
        <Route path='/edit'             component={EditTweet} />
        {/* <Route path='/form/:type'       component={TweetForm} />*/}
        <Route exact path='/'           component={TweetList} />
        <Route path ='/*'               component={NotFound} />
      </Switch>
    </div>
  );
};
