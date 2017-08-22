import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link    } from 'react-router-dom';
import {
  Card,
  CardBlock,
  CardText,
  CardTitle,
  CardFooter,
  CardHeader,
  Button
} from 'reactstrap';
import * as dataReducerActions from './../actions/DataReducerActions';

const Tweet = (props) => {
  return (
    <div className='col-md-8 col-sm-8 mr-auto ml-auto'>
      <Card className='m-3'>
        <CardHeader>
          <CardTitle>#{props.tweets[props.index].id} {props.tweets[props.index].title}</CardTitle>
        </CardHeader>
        <CardBlock className='p-3'>
          <CardText>{props.tweets[props.index].body}</CardText>
        </CardBlock>
        <CardFooter>
          <Link
            onClick={() => {
              props.requestData();
              props.setCurrentTweet(props.index);
            }}
            className='btn btn-primary'
            to={'/tweet-detail/' + props.tweets[props.index].id}>
            Details
          </Link>
          <Button
            color='danger'
            className='ml-2'
            onClick={(e) => { e.preventDefault(); props.deleteTweet(props.index); }}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

Tweet.propTypes = {
  index:           PropTypes.number,
  tweets:          PropTypes.array,
  setCurrentTweet: PropTypes.func.isRequired,
  deleteTweet:     PropTypes.func.isRequired,
  requestData:     PropTypes.func.isRequired
};

Tweet.defaultProps = {
  index: 0,
  tweets: []
};

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  };
};

const mapDispatchToProps = {
  setCurrentTweet: dataReducerActions.setCurrentTweet,
  deleteTweet:     dataReducerActions.deleteTweet,
  requestData:     dataReducerActions.requestData
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
