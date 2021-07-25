import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='post-form-header'>
        <h3>Leave a Comment</h3>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type='submit' value='Comment' class='btn btn-dark adjustbtn' />
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
