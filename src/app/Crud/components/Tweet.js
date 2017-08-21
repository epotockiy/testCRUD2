import React     from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';
import {
  Card,
  CardBlock,
  CardText,
  CardTitle,
  CardFooter,
  CardHeader,
  Button
} from 'reactstrap';

export const Tweet = (props) => {
  return (
    <div className='col-md-6 col-sm-6'>
      <Card className='m-3'>
        <CardHeader>
          <CardTitle>#{props.tweet.id} {props.tweet.title}</CardTitle>
        </CardHeader>
        <CardBlock className='p-3'>
          <CardText>{props.tweet.body}</CardText>
        </CardBlock>
        <CardFooter>
          <Link
            onClick={props.setCurrentTweet}
            className='btn btn-primary'
            to={'/tweet-detail/' + props.tweet.id}>
            Details
          </Link>
          <Button
            color='danger'
            className='ml-2'
            onClick={(e) => { e.preventDefault(); props.onDeleteClick(); }}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

Tweet.propTypes = {
  tweet:           PropTypes.object,
  onDeleteClick:   PropTypes.func,
  setCurrentTweet: PropTypes.func
};

Tweet.defaultProps = {
  tweet: {}
};
