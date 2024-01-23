import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import {Link} from 'react-router-dom'
import {getProfileByID} from '../../action/profile';

const Profile = ({getProfileByID,profile:{ profile,loading},auth, match}) => {
    useEffect(()=>{
        getProfileByID(match.params.id);
    },[getProfileByID,match.params.id])
    return (
        <>
            {profile===null || loading ?<Spinner/>:
            <>
               
                {auth.isAuthenticated&&
                auth.loading===false && 
                auth.user._id===profile.user._id
                }
                
                    <div class="profile-grid my-1" > 
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile}/>
                    <div className="profile-exp bg-white p-2" style={{width:"100%",float:"left"}}>
                    <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <>
                            {profile.experience.map((experience) => (
                                <ProfileExperience
                                key={experience._id}
                                experience={experience}
                                />
                            ))}
                            </>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div>

                    <div className="profile-edu bg-white p-2" style={{marginLeft:"5%"}}>
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div> 
                </div>
                
                  
            {profile.github?(<ProfileGithub username={profile.github}/>):(<>No github</>)}
            {/* {profile.repos===undefined?(
                <>
                    <div style={{width:"100%",position:"relative"}}>
                        <div className="left">
                            <img style={{width:"500px",height:"500px"}} src={ErrorIcon}></img>
                            
                        </div>
                        <div className="right">
                            <h1>So Sorry, Github API Is Broken. Contact Developers For More Information</h1>
                        </div>
                    </div>
                </>
            ):(<>{profile.github?(<ProfileGithub username={profile.github}/>):(<>No github</>)}</>)} */}
            </>
            }
        </>
    )
}

Profile.propTypes = {
    getProfileByID:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps =state => ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileByID})(Profile)
