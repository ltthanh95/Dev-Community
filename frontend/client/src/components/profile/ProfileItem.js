import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col,Card,Button  } from 'react-bootstrap'
const ProfileItem = ({profile:{user:{_id,name,avatar},status,company,skills,bio}}) => {
    
    return (
        
            <Col xs={6} md={4}>
            <Card style={{ width: '18rem' }}>
            <div className='pics'>
                <Card.Img className="hover-img" variant="top" src={avatar} alt='' />
                <ul className="list-inline member-icons animate text-center">
                                    <li className="list-inline-item">
                                    <Link to={`/profile/${_id}`} > 
                                        <i class="fas fa-user-plus"></i>
                                    </Link>   
                                    </li>
                </ul>
            </div>
                <Card.Body>
                    <Card.Title>{name} </Card.Title>
                    <Card.Text>
                    <p>{status} {company&& <span> at {company}</span>}</p>
                 <p>Skills: {skills.slice(0,4).map((skill,index)=>(<>{skill}{", "} </>))}
                 </p>
                 <p>Bio: {bio?(<>{bio}</>):(<>No Bio Provided</>)}</p>
                    </Card.Text>
                    
                </Card.Body>
                </Card>
            </Col>
        
        
       
    )
}

ProfileItem.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileItem

