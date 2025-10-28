import React from 'react'
import success from '../assets/success.png'
import '../styles/SuccessMessage.css'

export default function SuccessMessage() {
  return (
    <div className="successMsgContainer">
      <div></div>
      <div className="successMessage">
        <h2>Thanks For Ordering</h2>

        <div>
          <p className='rightSymbol'>
            <img src={success} alt="" height='48px' />
          </p>
        </div>
      </div>
      <div className='redirectNote'>Redirecting in 3 seconds</div>
    </div>
  );
}
