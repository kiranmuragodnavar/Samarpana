import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <div class="login-box ">
            <h2 className='center'>PAGE NOT FOUND</h2>
            <h3 className='center'><NavLink to="/">Back to Home</NavLink></h3>
        </div>
    )
}

export default Error