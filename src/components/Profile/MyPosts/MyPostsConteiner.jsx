import React from 'react' ;
import MyPosts from './MyPosts';
import { addPostActionCreator, deletePost } from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
      }
};

const mapDispatchToProps = (dispatch) => {
return{
  addPost: (newPostText) => { 
    dispatch( addPostActionCreator(newPostText) );
    },

    deletePost: (postId) => {
      dispatch(deletePost(postId))
    }

  }
}

const MyPostsConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsConteiner;