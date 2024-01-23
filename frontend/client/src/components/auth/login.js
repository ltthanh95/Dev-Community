import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import {conenct, connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../action/auth'

const Login=({login,isAuthenticated})=>{
    const[formData,SetFormData]=useState({
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        SetFormData({...formData,[e.target.name]:e.target.value})
    }
    const {email,password}=formData
    const onSubmit=async(e)=>{
        e.preventDefault();
        login(email,password);
        
        
    }
    //redirect if logged in
    if(isAuthenticated){
        
        return <Redirect to='/profiles'/> 
    }
    
    return(
       <>
       
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
       </>
    )
}
Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)