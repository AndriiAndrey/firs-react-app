import React from 'react' ;
import classes from './MyPosts.module.css' ;
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../../Common/FormsControls/FormsControls';

const MyPosts = React.memo(props => {

let postElements = [...props.posts]
.reverse()
.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} deletePost={props.deletePost} userId={p.id} />);

let onAddPost = (values) => {
  props.addPost(values.newPostText);
};

  return(       
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
        <div className={classes.posts}>
        {postElements}
        </div>
      </div>
    )
});

const maxLength300 = maxLengthCreator(300)

const AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
          <div>
            <div>
        <Field  component={Textarea} name={"newPostText"} placeholder={"Enter your message"}
        validate={[required,maxLength300 ]}/>
          </div>
          <div>
        <button>Add post</button>
          </div>
        </div>
      </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;