import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../actions/post';

const PostItem = ({
  addLike,
  deletePost,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={e => addLike(_id)}
              type='button'
              className='btn btn-dark adjustbtn'
            >
              <i class='far fa-thumbs-up' />{' '}
              <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>

            <button
              onClick={e => removeLike(_id)}
              type='button'
              className='btn btn-dark'
            >
              <i class='far fa-thumbs-down' />
            </button>

            <Link to={`/posts/${_id}`} className='btn btn-dark'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={e => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

// need mapStateToProps, bring in the auth state
// delete button shows up only when poster logs in

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
