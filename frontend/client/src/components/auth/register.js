import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {setAlert} from '../../action/alert'
import {register} from '../../action/auth'
import PropTypes from 'prop-types'
const Register=({setAlert,register,isAuthenticated})=>{
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const [message,setMessage]=useState("")
    const [error,setError]=useState(false)
    const {name,email,password,password2}=formData//get data in useState
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
    const submit=async(e)=>{
        e.preventDefault();
        if(password!==password2){
            // setError(true)
            // setMessage("password does not match")
            setAlert("Password does not match",'danger')
        }
        else{
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }
            //     const body=JSON.stringify(newUser)
                
            //     const res=await axios.post('http://127.0.0.1:8000/api/users/register',body,config)
            //     setError(false)
            //     setMessage(res.data)
            // } catch (error) {
            //     setError(true)
            //     setMessage(error.response.data.errors[0].msg)
                
            // }
            register({name,email,password})
        }
        // if(isAuthenticated){
        //   return <Redirect to='/dashboard'/>
        // }
        
       
    }
    if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }
   
    return(
        <>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        {/* {error?(<p style={{color:"red"}}>{message}</p>):(<p style={{color:"green"}}>{message}</p>)} */}
      <form className="form" onSubmit={e=>submit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e=>onChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
         
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
        </>
    )
}
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)