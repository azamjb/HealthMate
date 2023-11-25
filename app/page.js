"use client"
import React, { useState, useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './utilities';
import Webcam from 'react-webcam';

// Assuming keypoints is an array of objects like the one in the image
// with properties 'part', 'position.x', and 'position.y'
// For example: { part: 'leftEye', position: { x: 100, y: 200 } }



function isFacingCamera(facialLandmarks) {
  const rightEye = facialLandmarks.find(landmark => landmark.part === 'rightEye');
  const leftEye = facialLandmarks.find(landmark => landmark.part === 'leftEye');
  const nose = facialLandmarks.find(landmark => landmark.part === 'nose');
  const rightEar = facialLandmarks.find(landmark => landmark.part === 'rightEar');
  const leftEar = facialLandmarks.find(landmark => landmark.part === 'leftEar');

  // Calculate distances between the eyes and between the ears
  const eyeDistanceHorizontal = Math.abs(rightEye.position.x - leftEye.position.x);
  const earDistance = rightEar && leftEar ? Math.abs(rightEar.position.x - leftEar.position.x) : null;

  // Check if the nose is approximately centered horizontally between the eyes
  const noseHorizontalPosition = (rightEye.position.x + leftEye.position.x) / 2;
  const noseHorizontalOffset = Math.abs(nose.position.x - noseHorizontalPosition);

  // Determine the vertical position of the nose relative to the eyes
  const eyeLevel = (rightEye.position.y + leftEye.position.y) / 2;
  const noseVerticalOffset = Math.abs(nose.position.y - eyeLevel);

  // Define a threshold for how much horizontal and vertical offset is allowed
  // These thresholds can be fine-tuned for sensitivity
  const horizontalOffsetThreshold = eyeDistanceHorizontal * 0.8;
  const verticalOffsetThreshold = eyeDistanceHorizontal; // Allowing more vertical leeway

  // Check if the person is facing the camera based on the nose position
  // The person can be looking up or down but still be considered facing forward
  const isFacingForward = noseHorizontalOffset < horizontalOffsetThreshold && noseVerticalOffset < verticalOffsetThreshold;

  return isFacingForward;
}



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
      // console.log(pose);
      console.log(isFacingCamera(pose.keypoints));
      drawCanvas(pose, videoWidth, videoHeight);
    }
  };

  const drawCanvas = (pose, videoWidth, videoHeight) => {
    const canvas = canvasRef.current;

    // Check if canvas reference and context are available before accessing them
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
  
      // Check if the context is available before using it
      if (ctx) {
        canvas.width = videoWidth;
        canvas.height = videoHeight;
  
        drawKeypoints(pose['keypoints'], 0.5, ctx);
        drawSkeleton(pose['keypoints'], 0.5, ctx);
      } else {
        console.error('Canvas context not available.');
      }
    } else {
      console.error('Canvas reference not available.');
    }
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
          className={`my-2 px-4 py-2 bg-blue-500 text-white rounded-md ${isClicked ? 'bg-red-700' : 'bg-green-500'
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
      {isClicked ? (
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
      ) : (
        <div>
        
        </div>
      )}
    </div>
  );
};

export default Home;
