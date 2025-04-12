import React from 'react'

const MessageFeedback = (props) => {
  return (
    <>
        {props.details && <div class="feedbackMessage">
            <h3>{props.header}</h3>
            <p className='details'>{props.details}</p>
        </div>}
    </>
  )
}

export default MessageFeedback