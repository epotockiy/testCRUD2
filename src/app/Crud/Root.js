import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header        } from './components/Header';
import { NotFound      } from './components/NotFound';
import Form              from './components/Form';
import UserList          from './components/UserList';
import User              from './components/User';
import TweetList         from './components/TweetList';
import TweetDetail       from './components/TweetDetail';

export const Root = () => {
  return (
    <div className="container">
      <Header />

      <Switch>
        <Route path='/tweets/:page'     component={TweetList} />
        <Route path='/tweets'           component={TweetList} />
        <Route path='/tweet-detail/:id' component={TweetDetail} />
        <Route path='/users'            component={UserList} />
        <Route path='/user/:id'         component={User} />
        <Route path='/form/:type'       component={Form} />
        <Route exact path='/'           component={TweetList} />
        <Route path ='/*'               component={NotFound} />
      </Switch>
    </div>
  );
};
