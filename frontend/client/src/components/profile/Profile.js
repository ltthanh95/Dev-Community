import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import ProfileItem from './ProfileItem'
import {getProfiles} from '../../action/profile'
import {Row} from 'react-bootstrap'
const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);
    console.log(profiles)
    return (
      <>
        { loading ? (
          <Spinner />
        ) : (
          <>
            {profiles.length===0?(<>SORRY CANNOT FETCH DATA</>):(
              <>
                <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse and connect with
              developers
            </p>
            <div className='profiles'>
              <Row>
              {profiles.profiles.length > 0 ? (
                profiles.profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile}  />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
              </Row>
            </div>
              </>

            )}
          </>
        )}
      </>
    );
  };
  
  Profile.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });
  
  export default connect(
    mapStateToProps,
    { getProfiles }
  )(Profile)