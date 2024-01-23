import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEducation} from '../../action/profile'
import {Link,withRouter} from 'react-router-dom'

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const [toDateDisabled,toggleDisabled]=useState(false);
    const [message,setMessage]=useState('')
    const {school,degree,fieldofstudy,from,to,current,description}=formData
    const onChange= e=>{
         setFormData({...formData,[e.target.name]:e.target.value})
        }
    
    return (
        <>
            <h1 className="large text-primary">
        Add Your Education
      </h1>
      {new Date(to)<new Date(from)?(<p style={{color:'red'}}>{message}</p>):(null)}
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={
          e=>{
              e.preventDefault();
              if(new Date(to)<new Date(from)){
                  setMessage('Invalid Date')
              }
              else{
                addEducation(formData,history)
              }
          }
      }>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            onChange={e=>onChange(e)}
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            onChange={e=>onChange(e)}
            value={degree}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy"  onChange={e=>onChange(e)}
            value={fieldofstudy}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={e=>onChange(e)}
            value={from}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value="current" checked={current} onChange={e=>{
                setFormData({...formData,current:!current});
                toggleDisabled(!toDateDisabled)
            }}
            /> {' '}Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date{new Date(to)<new Date(from)?(<span><i class="fas fa-times" style={{color:'red'}}></i></span>):(<span><i class="far fa-check-circle" style={{color:'green'}}></i></span>)}</h4>
          <input type="date" name="to" onChange={e=>onChange(e)}
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onChange={e=>onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" href="/dashboard">Go Back</Link>
      </form>
        </>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect (null,{addEducation})(withRouter(AddEducation))
