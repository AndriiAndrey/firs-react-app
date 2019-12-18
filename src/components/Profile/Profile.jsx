import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsConteiner from './MyPosts/MyPostsConteiner';

const Profile = (props) => {
    return(
      <div >
      <ProfileInfo 
      isOwner={props.isOwner}
      profile={props.profile} 
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
      />
      <MyPostsConteiner />
    </div>
    );
}

export default Profile;