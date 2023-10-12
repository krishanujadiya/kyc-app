import React, { Component } from 'react';
import Webcam from 'react-webcam';

class CatureImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    };
    this.webcamRef = React.createRef();
  }

  captureImage = () => {
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({ imageSrc });
  };

  render() {
    return (
      <div>
        <Webcam ref={this.webcamRef} audio={true} />
        <button onClick={this.captureImage}>Capture Image</button>
        {this.state.imageSrc && <img src={this.state.imageSrc} alt="Captured" />}
      </div>
    );
  }
}

export default CatureImage;
