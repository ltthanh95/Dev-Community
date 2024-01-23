import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteExp} from '../../action/profile'
import Moment from 'react-moment'
const Exp = ({experience,deleteExp}) => {
    
    
    return (
        <>
            <h2 className='my-2'>Experience Credetials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th className='hide-sm'>
                            Title
                        </th>
                        <th className='hide-sm'>
                            Years
                        </th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {experience.length>0?(experience.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment>-{' '}{exp.to===null?('Now'):(<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
            </td>
            <td>
                <button onClick={()=>deleteExp(exp._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>))):(<p>Nothing</p>)}
                </tbody>
            </table>
        </>
    )
}

Exp.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExp:PropTypes.func.isRequired,
}

export default connect(null,{deleteExp})(Exp)
