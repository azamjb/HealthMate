"use client"
import React, { useState, useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './utilities';
import Webcam from 'react-webcam';

const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      drawCanvas(pose, videoWidth, videoHeight);
    }
  };

  const drawCanvas = (pose, videoWidth, videoHeight) => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
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
    runPosenet();
  }, []); 

  return (
    <div className='p-4 h-screen bg-zinc-900 flex'>

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
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    </div>
  );
};

export default Home;
