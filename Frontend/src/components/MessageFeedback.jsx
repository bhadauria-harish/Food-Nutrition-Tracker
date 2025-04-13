import React from 'react'

const MessageFeedback = (props) => {
  return (
    <>
        {props.details && <div class="feedbackMessage">
            <h3>{props.header}</h3>
            <p className='details' id={props.colorName}>{props.details}</p>
        </div>
        }
    </>
  )
}

export default MessageFeedback