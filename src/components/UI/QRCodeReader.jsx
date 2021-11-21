import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

const QRCodeReader = ({ onCode, className }) => {
  const ref = useRef();
  const streamRef = useRef();
  const wrappingRef = useRef({
    video: undefined,
    canvasElement: undefined,
    canvas: undefined,
  });

  useEffect(() => {
    wrappingRef.current = {
      video: document.createElement('video'),
      canvasElement: ref.current,
      canvas: ref.current.getContext('2d'),
    };

    // Retrieve video stream from camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      streamRef.current = stream;
      wrappingRef.current.video.srcObject = stream;
      wrappingRef.current.video.setAttribute('playsinline', true);
      wrappingRef.current.video.play();
      requestAnimationFrame(tick);
    });

    // Disable camera (by stopping stream tracks) when component is destroyed
    return () => {
      const tracks = streamRef.current?.getTracks() ?? [];
      for (const track of tracks) if (track.enabled) track.stop();
    };
  }, []);

  function drawLine(begin, end, color) {
    wrappingRef.current.canvas.beginPath();
    wrappingRef.current.canvas.moveTo(begin.x, begin.y);
    wrappingRef.current.canvas.lineTo(end.x, end.y);
    wrappingRef.current.canvas.lineWidth = 4;
    wrappingRef.current.canvas.strokeStyle = color;
    wrappingRef.current.canvas.stroke();
  }

  function tick() {
    if (wrappingRef.current.video.readyState === wrappingRef.current.video.HAVE_ENOUGH_DATA) {
      wrappingRef.current.canvasElement.width = wrappingRef.current.video.videoWidth;
      wrappingRef.current.canvasElement.height = wrappingRef.current.video.videoHeight;
      wrappingRef.current.canvas.drawImage(
        wrappingRef.current.video,
        0,
        0,
        wrappingRef.current.canvasElement.width,
        wrappingRef.current.canvasElement.height,
      );
      var imageData = wrappingRef.current.canvas.getImageData(
        0,
        0,
        wrappingRef.current.canvasElement.width,
        wrappingRef.current.canvasElement.height,
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
        onCode(code);
      }
    }
    requestAnimationFrame(tick);
  }
  return (
    <div className={className}>
      <canvas className={`${className}-preview`} ref={ref}></canvas>
    </div>
  );
};

QRCodeReader.propTypes = {
  onCode: PropTypes.func.isRequired,
  className: PropTypes.string,
};

QRCodeReader.defaultProps = {
  className: '',
};

export default QRCodeReader;
