import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from "../layout/Spinner"
import {getCurrentProfile } from '../../action/profile'
import DashboardAction from './DashboardAction'
import Exp from './Exp'
import Education from './Education'
import { Link } from 'react-router-dom'
import {deleteProfile} from '../../action/profile'
const Dashboard=({getCurrentProfile,deleteProfile,auth:{user},profile:{profile,loading}})=>{
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile])
    return loading && profile===null ? (<Spinner/>):(
    <>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile!==null?(
        <>
        <DashboardAction/>
        <Exp experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className='my-2'>
            <button className='btn btn-danger' onClick={()=>deleteProfile()}>
                <i className='fas fa-user-minus'> Delete My Account</i>
            </button>
        </div>
        </>):(<>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
        
        </>)}
    
    </>)
}
Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteProfile:PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile,deleteProfile})(Dashboard)