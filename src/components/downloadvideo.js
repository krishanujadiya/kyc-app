import React, { useState, useRef } from 'react';

const VideoRecorder = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef();

  const startVideoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        // Combine recorded video chunks into a single Blob
        const recordedVideoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(recordedVideoBlob);

        // Display the recorded video on the page
        videoRef.current.src = videoUrl;
      };

      setVideoStream(stream);
      setMediaRecorder(recorder);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const startRecording = () => {
    alert("Recording is started");
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    alert("Recording is stopped, you can download");
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) {
      console.error('No recorded data to download.');
      return;
    }

    const recordedVideoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = window.URL.createObjectURL(recordedVideoBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded-video.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={startVideoCapture}>Start Video</button>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={downloadRecording}>Download Recording</button>
    </div>
  );
};

export default VideoRecorder;
