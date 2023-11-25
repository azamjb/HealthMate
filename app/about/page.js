import React from 'react'

const page = () => {
  return (
    <div className='p-4 h-screen bg-zinc-900'>
        <h1 className='font-bold text-2xl mb-6'>About Ergobot: Your Digital Health Assistant</h1>
            <p className='px-5 border mb-4 bg-yellow-700 p-4'>
                Welcome to Ergobot, your comprehensive digital health assistant designed to enhance your well-being while you work at your computer.
                Ergobot strives to create a more health-conscious and productive workspace environment by seamlessly integrating digital health tools into your daily work routine.
                Our development team has diligently worked on implementing features such as posture correction and awareness, screen time management, maintaining a safe distance from the screen, and hydration reminders.
                Ergobot is currently in development, and we are continuously refining its features to provide you with an optimal digital health assistant. Stay tuned for updates and our upcoming live demos.
            </p>
        <h1 className='text-xl mb-6'>Posture Correction and Awareness</h1>
            <p className='px-5 border mb-4 bg-yellow-700 p-4'>
            Ergobot utilizes advanced AI posture detection technology to alert you when your posture needs adjustment. By monitoring your sitting habits, 
            Ergobot helps you maintain a healthier posture throughout your workday, reducing strain and potential discomfort.
            </p>
        <h1 className='text-xl mb-6'>Screen Time Management</h1>
            <p className='px-5 border mb-4 bg-yellow-700 p-4'>
            Ergobot detects and notifies you when you've been sitting or staring at the screen for too long, prompting you to take breaks. Using innovative face detection methods, 
            Ergobot encourages periodic breaks and prompts you to glance out the window, reducing eye strain and encouraging a healthier balance between screen time and rest.
            </p>
        <h1 className='text-xl mb-6'>Maintaining Safe Distance from Screen</h1>
          <p className='px-5 border mb-4 bg-yellow-700 p-4'>
          Ergobot advises you to maintain a safe distance from your screen. Through snapshots and face detection algorithms, it gauges your proximity to the screen and alerts you if you're too close, 
          promoting eye safety and healthier viewing distances.
          </p>
    </div>
  )
}

export default page