import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='post-form-header'>
        <h3>Say something...</h3>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addPost({ text });
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
          <input type='submit' value='Submit' class='btn btn-dark adjustbtn' />
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
