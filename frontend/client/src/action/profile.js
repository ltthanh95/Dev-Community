import axios from 'axios'
import api from '../ultils/api';
import {setAlert} from './alert'
import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS,
    ERROR_REPOS
} from './types'

//Get current users profiles
export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res=await api.get('/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({type:CLEAR_PROFILE})
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//Get All users profiles
export const getProfiles=()=>async dispatch=>{
    
    try {
        const res=await api.get('/profile');
        console.log(res.data)
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        
        dispatch({type:CLEAR_PROFILE})
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//Get  users profiles by id
export const getProfileByID=(userId)=>async dispatch=>{
    
    try {
        const res=await api.get(`/profile/user/${userId}`);
        console.log(res.data)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({type:CLEAR_PROFILE})
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



//Get Github repos
export const getGithubRepos=(username)=>async dispatch=>{
    
    try {
        const res=await api.get(`/profile/github/${username}`);
        
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.response)
        // dispatch({
        //     type:ERROR_REPOS,
        //     payload:{msg:error.response.statusText,status:error.response.status}
        // })
       
    }
}


// Create or update Profile
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const res=await api.post('/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit?'Profile Updated':'Profile Created','success'))
        if(!edit){
            history.push('/profiles')
        }
    } catch (error) {
        //const errors=error.response.data.errors
        console.log(error)
        
        // if(errors){
        //     errors.forEach(error => {dispatch(setAlert(error.msg,'danger'))
                
        //     });
        // }
        
        // dispatch({
        //     type:PROFILE_ERROR,
        //     payload:{msg:error.response.statusText,status:error.response.status}
        // })
    }
}
// Add Experience

export const addExperience=(formData,history)=>async dispatch =>{
    try {
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const res=await api.put('/profile/experience',formData,config)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Added','success'))
       
        history.push('/dashboard')
       
    } catch (error) {
        const errors=error.response.data.errors
        const err=error.response.data.msg
      
        dispatch(setAlert(err,'danger'))
        
        if(errors){
            errors.forEach(error => {dispatch(setAlert(error.msg,'danger'))
                
            });
        }
        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

//Add Education

export const addEducation=(formData,history)=>async dispatch =>{
    try {
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const res=await api.put('/profile/education',formData,config)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Added','success'))
       
        history.push('/dashboard')
       
    } catch (error) {
        const errors=error.response.data.errors
       
        
        if(errors){
            errors.forEach(error => {dispatch(setAlert(error.msg,'danger'))
                
            });
        }
        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

//delete EXP

export const deleteExp=id=>async dispatch=>{
    try {
        const res =await api.delete(`/profile/experience/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Deleted','success'))
    } catch (error) {
     
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

//delete Education

export const deleteEducation=id=>async dispatch=>{
    try {
        const res =await api.delete(`/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Deleted','success'))
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

//Delete Account & Profile

export const deleteProfile=()=>async dispatch=>{
    if(window.confirm('Are you sure? This can Not be undone')){
        try {
            const res =await api.delete(`/profile`)
            dispatch({
                type:CLEAR_PROFILE,
                
            })
            dispatch({
                type:DELETE_ACCOUNT,
                
            })
            dispatch(setAlert('Your account has been pernamently deleted'))
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText,status:error.response.status}
            })
            
        }
    }
    
}