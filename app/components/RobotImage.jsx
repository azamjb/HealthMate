import React, { useState, useEffect } from 'react';

const RobotImage = ({typedText}) => { // typing speed 60
//   const [typedText, setTypedText] = useState('');

//   useEffect(() => {

//     if (isOpen) {

//       let charIndex = 0; // set index to 0

//       const typingInterval = setInterval(() => {

//         if (charIndex < text.length) { // check if current index is smaller than output message length

//           setTypedText((prevText) => prevText + text.charAt(charIndex));
//           charIndex++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, typingSpeed);

//       return () => clearInterval(typingInterval);
//     } else {
//       setTypedText('');
//     }
//   }, [isOpen, text, typingSpeed]);

//   if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    bottom: '2%',
    right: '10%',
    // transform: 'translate(-50%, -50%)',
    zIndex: '1000',
    backgroundColor: 'rgba(255,245,207,255)',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '200px',
    textAlign: 'center'
  };

//   const overlayStyle = {
//     // position: 'fixed',
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: '1000'
//   };

  const imageStyle = {
    width: '100%', // Adjusted to fill the modal width
    height: 'auto',
    margin: '0 auto'
  };

  return (
    <>
      {/* <div style={overlayStyle} onClick={onClose} /> */}
      <div style={modalStyle} className='absolute buttom-3'>
        <img src="/ergobot.png" alt="Popup Image" style={imageStyle} />
        <p style={{ color: 'black', fontWeight: 'bold', marginTop: '10px' }}>{typedText}</p>
        {/* <button
          className='mt-2 px-4 py-2 text-black rounded-md'
          style={{ backgroundColor: '#918767' }} // Set button background color here
          onClick={onClose}
        >
          Close
        </button> */}
      </div>
    </>
  );
};

export default RobotImage;