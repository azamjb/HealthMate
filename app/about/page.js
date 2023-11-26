import React from 'react';

const Page = () => {
  // Define RGB color variables
  const background = '#fff6d0'; // cream
  const backgroundtwo = '#faeb96'; // cream
  const textColor = '#583e1d';
  const accentColor = '#c39b3e';

  // Define border style
  const boxBorderStyle = '1px solid #000'; // example: black solid border

  return (
    <div style={{ backgroundColor: background, color: textColor }} className="p-4 h-screen">
      <h1 style={{ color: textColor }} className="font-bold text-3xl mb-6">About Ergobot: Your Digital Health Assistant</h1>
      <div style={{ backgroundColor: backgroundtwo, border: boxBorderStyle }} className="mb-6 p-4 rounded-lg shadow-lg">
        <p style={{ color: textColor }} className="mb-4">
          Welcome to Ergobot, your comprehensive digital health assistant designed to enhance your well-being while you work at your computer. Ergobot strives to create a more health-conscious and productive workspace environment by seamlessly integrating digital health tools into your daily work routine.
        </p>
      </div>
      <h2 style={{ color: textColor }} className="font-bold text-2xl mb-4">Posture Correction and Awareness</h2>
      <div style={{ backgroundColor: backgroundtwo, border: boxBorderStyle }} className="mb-6 p-4 rounded-lg shadow-lg">
        <p style={{ color: textColor }} className="mb-4">
          Ergobot utilizes advanced AI posture detection technology to alert you when your posture needs adjustment. By monitoring your sitting habits, Ergobot helps you maintain a healthier posture throughout your workday, reducing strain and potential discomfort.
        </p>
      </div>
      <h2 style={{ color: textColor }} className="font-bold text-2xl mb-4">Screen Time Management</h2>
      <div style={{ backgroundColor: backgroundtwo, border: boxBorderStyle }} className="mb-6 p-4 rounded-lg shadow-lg">
        <p style={{ color: textColor }} className="mb-4">
          Ergobot detects and notifies you when you've been sitting or staring at the screen for too long, prompting you to take breaks. Using innovative face detection methods, Ergobot encourages periodic breaks and prompts you to glance out the window, reducing eye strain and encouraging a healthier balance between screen time and rest.
        </p>
      </div>
      <h2 style={{ color: textColor }} className="font-bold text-2xl mb-4">Maintaining Safe Distance from Screen</h2>
      <div style={{ backgroundColor: backgroundtwo, border: boxBorderStyle }} className="mb-6 p-4 rounded-lg shadow-lg">
        <p style={{ color: textColor }} className="mb-4">
          Ergobot advises you to maintain a safe distance from your screen. Through snapshots and face detection algorithms, it gauges your proximity to the screen and alerts you if you're too close, promoting eye safety and healthier viewing distances.
        </p>
      </div>
    </div>
  );
}

export default Page;

