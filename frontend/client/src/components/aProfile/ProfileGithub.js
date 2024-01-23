import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getGithubRepos} from '../../action/profile'
import Spinner from '../layout/Spinner'
import ErrorIcon from '../../img/Octocat.png'
const ProfileGithub = ({username,getGithubRepos,repos}) => {
    useEffect(()=>{
        getGithubRepos(username)
    },[getGithubRepos(username)])
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos===null?(<><Spinner/></>):(
                <>
                {repos.length>0?(
                    repos.map(repo=>(
                        <div key={repo.id} className='repo bg-white p-1 my-1'>
                                <div>
                                    <h4>
                                        <a href={repo.html_url} target='_blank' rel='noopener noreferrence'>
                                            {repo.name}
                                        </a>
                                    </h4>
                                    <p>{repo.description}</p>
                                </div>
                                <div>
                                    <ul>
                                        <li className='badge badge-primary'>
                                            Starts:{repo.stargazers_count}
    
                                        </li>
                                        <li className='badge badge-dark'>
                                            Watchers:{repo.watchers_count}
    
                                        </li>
                                        <li className='badge badge-light'>
                                            Forks:{repo.forks_count}
    
                                        </li>
                                    </ul>
                                </div>
    
                        </div>
                    ))

                ):(<>
                    <div style={{width:"100%",position:"relative"}}>
                        <div className="left">
                            <img style={{width:"500px",height:"500px"}} src={ErrorIcon}></img>
                            
                        </div>
                        <div className="right">
                            <h1>So Sorry, Github API Is Broken. Contact Developers For More Information</h1>
                        </div>
                    </div>
                </>)}
                </>
            )}
        </div>
       
    )
}

ProfileGithub.propTypes = {
    getGithubRepos:PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username:PropTypes.string.isRequired,
}
const mapStateToProps=state=>({
    repos:state.profile.repos
})
export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
