import React ,{useState, useEffect} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataFormReduxForm from './ProfileDataForm';
import ProfileData from './ProfileData';


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length){
      savePhoto(e.target.files[0]);
    }
  }

    const onSubmit = (formData) => {
      saveProfile(formData).then( ()=>{

         setEditMode(false)
      });
       
      };
      
    

    return(
  
         <div className={classes.descriptionBlock}>
    <div className={classes.photoStatus}>
            <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} />
            { isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }
            
            { isOwner 
            ? <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            : <div> <b>Status:</b> {status || "No status"} </div>}
    </div>

     <div className={classes.dataWrapper}>
      { editMode 
      ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
      : <ProfileData goToEditMode={ () => {setEditMode(true)} } profile={profile} isOwner={isOwner} /> }
    </div>
          
        </div>

    );
}



export default ProfileInfo;