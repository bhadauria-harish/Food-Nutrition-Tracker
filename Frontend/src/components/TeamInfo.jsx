import React from 'react'
import TeamCard from './TeamCard'
import myImage from './assets/IMG_20250331_190652.jpg';
import './CSS/teamInfo.css'

const TeamInfo = () => {

  const teamInfo = [
    {
      name: "Harish Singh Bhadauria",
      role: "AI/ML Developer",
      image_url: myImage, // Adjust the path if necessary
      id: "1"
    },
    {
      name: "Aryan Raj",
      role: "Web Developer",
      image_url: myImage, // Adjust the path if necessary
      id: "1"
    },
    {
      name: "Aditya Mishra",
      role: "ML Developer",
      image_url: myImage, // Adjust the path if necessary
      id: "1"
    },
    {
      name: "Harshit Prakash",
      role: "Web Developer",
      image_url: myImage, // Adjust the path if necessary
      id: "1"
    }
  ]

  return (
    <>
      <div className="teamSection">
        <h1 className='ourteam'>Our Team</h1>
        <div className="teamCardsSection">
          {teamInfo.map((data) => (
            <TeamCard 
              name={data.name} 
              role={data.role} 
              image_url={data.image_url} 
              key={data.id} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TeamInfo