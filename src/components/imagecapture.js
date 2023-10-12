import React, { Component } from 'react';

class KYCImageCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      isCameraOn: false,
    };
  }

  startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      this.videoElement.srcObject = stream;
      this.setState({ isCameraOn: true });
    } catch (error) {
      console.error('Error starting the camera: ', error);
    }
  };

  captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = this.videoElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageSrc = canvas.toDataURL('image/jpeg');
    this.setState({ imageSrc, isCameraOn: false });
  };

  render() {
    return (
      <div>
        {this.state.isCameraOn ? (
          <div>
            <video
              ref={(element) => (this.videoElement = element)}
              autoPlay
            />
            <button onClick={this.captureImage}>Capture</button>
          </div>
        ) : (
          <div>
            {this.state.imageSrc ? (
              <div>
                <img
                  src={this.state.imageSrc}
                  alt="Captured"
                  width="300"
                  height="200"
                />
              </div>
            ) : (
              <button onClick={this.startCamera}>Start Camera</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default KYCImageCapture;
