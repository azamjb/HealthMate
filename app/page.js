"use client"
import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
        });
    }
  }, []);

  return (
    <div className='p-4 h-screen bg-zinc-900 flex'>
      <div className='ml-4'>
        <h1>Camera</h1>
        <video ref={videoRef} width='640' height='480' />
      </div>
      <div className='flex flex-col ml-auto space-y-4'>
        <button
          className={`my-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
            isClicked ? 'bg-red-700' : 'bg-green-500'
          }`}
          onClick={handleClick}
        >
          {isClicked ? 'Off' : 'On'}
        </button>
        <button className='my-2 px-4 py-2 bg-yellow-600 text-white rounded-md'>
          Button 2
        </button>
        <button className='my-2 px-4 py-2 bg-yellow-600 text-white rounded-md'>
          Button 3
        </button>
        <button className='my-2 px-4 py-2 bg-yellow-600 text-white rounded-md'>
          Button 4
        </button>
      </div>
    </div>
  );
}
