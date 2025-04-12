import React from 'react'
import './CSS/teamCard.css'

const TeamCard = (props) => {
  return (
    <div className="card">
        <img src={props.image_url} alt="Helo" />
        <p>Name : {props.name}</p>
        <p>Role : {props.role}</p>
    </div>
  )
}

export default TeamCard