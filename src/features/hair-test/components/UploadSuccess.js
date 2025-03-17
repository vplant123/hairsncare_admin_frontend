import React from 'react'

export default function UploadSuccess() {
  return (
    <div className="successicon text-center">
    <div className="text-center">
        <img alt='hair' src="https://hairsncares.com/assets/img/like.png" alt="like icon" />
    </div>
    <p>
        <b>Once again, thank you for your participation.</b>
        <br /> Now your online hair test is completed!
        <br />
        Your responses and submitted photos are now in the hands of our Hairsncares specialists for evaluation.
        <br />
        You are requested to take an Online Video Consultation with our Dermatologist!
    </p>
    <br />
    <button type="button" className="btn4 btn4-primary mt-44" onClick={continueToCheckout}>Continue to Checkout</button>
</div>

  )
}
