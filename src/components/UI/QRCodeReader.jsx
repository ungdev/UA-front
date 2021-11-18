import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

const QRCodeReader = ({ onCode, activated, className }) => {
  const ref = useRef();
  const [elements, setElements] = useState({ video: undefined, canvasElement: undefined, canvas: undefined });
  useEffect(() => {
    setElements({
      video: document.createElement('video'),
      canvasElement: ref.current,
      canvas: ref.current.getContext('2d'),
    });
  }, []);
  useEffect(() => {
    if (!elements.video) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
      elements.video.srcObject = stream;
      elements.video.setAttribute('playsinline', true);
      elements.video.play();
      requestAnimationFrame(tick);
    });
  }, [elements]);
  function drawLine(begin, end, color) {
    elements.canvas.beginPath();
    elements.canvas.moveTo(begin.x, begin.y);
    elements.canvas.lineTo(end.x, end.y);
    elements.canvas.lineWidth = 4;
    elements.canvas.strokeStyle = color;
    elements.canvas.stroke();
  }
  function tick() {
    if (activated) {
      if (elements.video.readyState === elements.video.HAVE_ENOUGH_DATA) {
        elements.canvasElement.width = elements.video.videoWidth;
        elements.canvasElement.height = elements.video.videoHeight;
        elements.canvas.drawImage(elements.video, 0, 0, elements.canvasElement.width, elements.canvasElement.height);
        var imageData = elements.canvas.getImageData(0, 0, elements.canvasElement.width, elements.canvasElement.height);
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
  activated: PropTypes.bool,
  className: PropTypes.string,
};

QRCodeReader.defaultProps = {
  activated: true,
  className: '',
};

export default QRCodeReader;
