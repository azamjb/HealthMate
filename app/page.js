"use client"
import React, { useState, useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './utilities';
import Webcam from 'react-webcam';
import RobotImage from './components/RobotImage';
import Head from 'next/head';
// import './style.css';

// Custom functions
function saveMinDist(facialLandmarks) {
  // console.log(facialLandmarks)
  const leftEye = facialLandmarks.find(landmark => landmark.part === 'leftEye');
  const rightEye = facialLandmarks.find(landmark => landmark.part === 'rightEye');
  const minDist = Math.abs(rightEye.position.x - leftEye.position.x);

  //returns minimum distance
  return minDist;
}

// to check if user is currently closer than minDist
function distanceToScreen(minDist, facialLandmarks) {

  const leftEye = facialLandmarks.find(landmark => landmark.part === 'leftEye');
  const rightEye = facialLandmarks.find(landmark => landmark.part === 'rightEye');
  const currentDist = Math.abs(rightEye.position.x - leftEye.position.x);

  if (currentDist <= minDist) {
    return true
  } else {
    return false
  }
}


function isSittingDown(facialLandmarks) {

  const leftEye = facialLandmarks.find(landmark => landmark.part === 'leftEye');

  //0.6 is max for nose
  //0.15 for eye, its more unique
  if (leftEye.score < 0.15) {
    // console.log(" ")
    // console.log("Score: " +  nose.score)
    return false;
  } else {
    return true;
  }
}

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
  const verticalOffsetThreshold = eyeDistanceHorizontal * 0.4; // Allowing more vertical leeway

  // Check if the person is facing the camera based on the nose position
  // The person can be looking up or down but still be considered facing forward && noseVerticalOffset < verticalOffsetThreshold;
  const isFacingForward = noseHorizontalOffset < horizontalOffsetThreshold;
  return isFacingForward;
  // console.log({horizontal:noseHorizontalOffset < horizontalOffsetThreshold, vertical:noseVerticalOffset < verticalOffsetThreshold})
  // return {horizontal:noseHorizontalOffset < horizontalOffsetThreshold, vertical:noseVerticalOffset < verticalOffsetThreshold};
}

// useEffect(()=>{
//   fetch('/api/hello')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// // },[])

const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [timeInput, setTimeInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeLeftBreak, setTimeLeftBreak] = useState(0)
  const [timerRunningBreak, setTimerRunningBreak] = useState(false)
  const [timeInputBreak, setTimeInputBreak] = useState('')

  const [textForBot, setTextForBot] = useState("Hello! I am  Health Mate!")
  const [landmarks, setLandMarks] = useState([]);
  const [capture, setCapture] = useState(null);
  const [isFacing, setIsFacing] = useState(false);
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [count, setCount] = useState(2000)

  // Your startScreenTimer function
  function startScreenTimer(facialLandmarks) {
    // If user is facing away, do the countdown
    if (isFacingCamera(facialLandmarks)) {
      // Update the count using setCount
      let newCount = count - 1
      setCount(newCount);
      //setCount(count = count - 1);
      // console.log("I SEE YOU FACING CAMERA")
      // console.log(count)
    }

  }

  async function handleSendSMS() {
    try {
      const response = await fetch('/api/infobip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '16478916836',
          text: 'Your message text',
        }),
      });

      const data = await response.json();
      // console.log('SMS sent successfully:', data);
      alert('SMS sent successfully!');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('Failed to send SMS.');
    }
  }



  //Toggle camera on/off
  const handleClick = () => {
    if (timeInput == '') {
      alert('Input your work time')
    }
    else {
      setIsClicked(!isClicked);
    }
    if (timeInput !== '') {
      setTimeLeft(parseInt(timeInput))
      setTimerRunning(true)
    }
    if (timeInputBreak !== '' && timeLeft === 0 && !timerRunningBreak && !isClicked) {
      setTimeLeftBreak(parseInt(timeInputBreak));
      setTimerRunningBreak(false);
    }
  };


  const handleCapture = () => {
    // console.log("functionCalled")
    setCapture(saveMinDist(landmarks));
    // console.log(capture);
  }

  //Countdown 
  // useEffect(() => {
  //   let countdown;

  // Countdown for work timer
  useEffect(() => {
    let workCountdown;

    if (timerRunning && timeLeft > 0) {
      workCountdown = setInterval(() => {
        // console.log(isFacing)
        if (isFacing) {
          // console.log(isFacingCamera(landmarks))
          setTimeLeft((prevTime) => prevTime - 1);
        }
      }, 1000);

      return () => clearInterval(workCountdown);
    } else if (timeLeft === 0 && timerRunning) {
      alert('Time for a break!');
      setIsClicked(false);
      setTimerRunning(false);

      // Start the break timer after work time ends
      setTimeLeftBreak(parseInt(timeInputBreak));
      setTimerRunningBreak(true);
    }

    return () => clearInterval(workCountdown);
  }, [timerRunning, timeLeft, isFacing]);

  // Countdown for break timer
  useEffect(() => {
    let breakCountdown;

    if (timerRunningBreak && timeLeftBreak > 0) {
      breakCountdown = setInterval(() => {
        setTimeLeftBreak((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(breakCountdown);
    } else if (timeLeftBreak === 0 && timerRunningBreak) {
      alert('Time to work again!');

      setTimerRunningBreak(false);
      handleSendSMS()
      // Start the work timer after break time ends
      setTimeLeft(parseInt(timeInput));
      setTimerRunning(false);
    }

    return () => clearInterval(breakCountdown);
  }, [timerRunningBreak, timeLeftBreak]);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 500);//Set here
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
      setLandMarks(pose.keypoints ? pose.keypoints : []);
      // console.log(pose);
      //console.log(isFacingCamera(pose.keypoints));
      // console.log(isSittingDown(pose.keypoints));
      // console.log(capture);
      // if(captuer)
      //   console.log(distanceToScreen(captuer, landmarks))
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

  useEffect(() => {
    console.log(landmarks[0])
    if (landmarks[0]) {
      // console.log(distanceToScreen(capture, landmarks));
      setIsFacing(isFacingCamera(landmarks));
      console.log(isFacingCamera(landmarks))
      if (distanceToScreen(capture, landmarks))
        setTextForBot("You Are Doing Well!")
      else
        setTextForBot("Don't Go Too Close");
    }
  }, [landmarks])


  return (
    <>
      <Head>
        <title>
          Health Mate
        </title>
      </Head>
      <div className='p-4 h-screen bg-white flex'>
        <div className='flex flex-col ml-auto space-y-4'>
          <button
            className={`shadow-lg my-2 px-4 py-2 bg-blue-500 text-white rounded-md ${isClicked ? 'bg-red-700' : 'bg-green-500'
              }`}
            onClick={handleClick}
          >
            {isClicked ? 'Off' : 'On'}
          </button>
          <button className='shadow-lgmy-2 px-4 py-2 bg-blue-400 text-white rounded-md' onClick={handleCapture}>Capture</button>


          {/*timer*/}
          <input
            type="number"
            placeholder="Enter time in seconds"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className='my-2 px-4 py-2 text-black rounded-md border'
          />
          {/* <button className='my-2 px-4 py-2 bg-yellow-600 text-white rounded-md' onClick={handleClick}>
        Start Timer
      </button> */}
          <div className='mt-auto'>
            {timerRunning ? (
              <div className='my-2 px-4 py-2 text-white bg-amber-400 font-bold text-center'>
                Time left: {formatSecondsToMinSec(timeLeft)} seconds
              </div>
            ) : (
              <div className='my-2 px-4 py-2 text-white bg-amber-400 font-bold text-center'>
                {timeLeft === 0 ? ('Set your work time') : "Set your work time"}
              </div>
            )}
          </div>
          <input
            type="number"
            placeholder="Enter time in seconds"
            value={timeInputBreak}
            onChange={(e) => setTimeInputBreak(e.target.value)}
            className='my-2 px-4 py-2 border text-black rounded-md'
          />
          <div className='mt-auto'>
            {timerRunningBreak ? (
              <div className='my-2 px-4 py-2 text-white bg-amber-400 font-bold text-center'>
                Time left: {formatSecondsToMinSec(timeLeftBreak)} seconds
              </div>
            ) : (
              <div className='my-2 px-4 py-2 text-white bg-amber-400 font-bold text-center'>
                {timeLeftBreak === 0 ? 'Set your break time' : 'Set Your Break time'}
              </div>
            )}
          </div>
        </div>
        {console.log(isClicked)}
        {isClicked ? (
          <div className="App">
            <header className="App-header">
              <Webcam
                ref={webcamRef}
                style={{
                  position: 'absolute',
                  left: 80, // Align to the left
                  top: '50%', // Center vertically
                  transform: 'translateY(-50%)', // Center vertically
                  zIndex: 9,
                  width: 640,
                  height: 480,
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  left: 80, // Align to the left
                  top: '50%', // Center vertically
                  transform: 'translateY(-50%)', // Center vertically
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
        <RobotImage typedText={textForBot} />
      </div>
    </>
  );
}

function formatSecondsToMinSec(seconds) {
  // Calculate minutes and seconds from the total seconds
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  // Return the formatted string with minutes and seconds
  // Pad the seconds with a leading zero if less than 10
  return min + ":" + (sec < 10 ? "0" : "") + sec;
}

export default Home;
