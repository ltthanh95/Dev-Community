import axios from 'axios'
import api from '../ultils/api';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import {setAlert} from './alert'
import setAuthToken from '../ultils/setAuthToken'
//Load User
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res=await api.get('http://127.0.0.1:8000/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//register USER

export const register =({name,email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }

    }
    const body=JSON.stringify({name,email,password});
    try {
        const res=await api.post('http://127.0.0.1:8000/api/users/register',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors=error.response.data.errors
        
        if(errors){
            errors.forEach(error => {dispatch(setAlert(error.msg,'danger'))
                
            });
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}


//login



export const login =(email,password)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }

    }
    const body=JSON.stringify({email,password});
    try {
        
        const res=await api.post('http://127.0.0.1:8000/api/auth/login',body,config)
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
       
        // const errors=error.response.data.errors
        
        // if(errors){
        //     errors.forEach(error => {dispatch(setAlert(error.msg,'danger'))
                
        //     });
        // }
        dispatch(setAlert("Authentication Fail!",'danger'))
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
//logout
export const logout=()=>dispatch=>{
    dispatch({type:LOGOUT});
    dispatch({type:CLEAR_PROFILE})
}