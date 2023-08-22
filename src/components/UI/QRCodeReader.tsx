'use client';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import jsQR, { QRCode } from 'jsqr';

/**
 * Renders a component that allows the user to scan a QR code.
 */
const QRCodeReader = ({
  onCode,
  className = '',
}: {
  /** The function to call when a QR code is scanned. */
  onCode: (code: QRCode) => void;
  /** An optional class name to add to the component. */
  className?: string;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();
  const wrappingRef = useRef({
    video: undefined as HTMLVideoElement | undefined,
    canvasElement: undefined as HTMLCanvasElement | null | undefined,
    canvas: undefined as CanvasRenderingContext2D | null | undefined,
  });

  useEffect(() => {
    wrappingRef.current = {
      video: document.createElement('video'),
      canvasElement: ref.current,
      canvas: ref.current!.getContext('2d'),
    };

    // Retrieve video stream from camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        streamRef.current = stream;
        wrappingRef.current.video!.srcObject = stream;
        wrappingRef.current.video!.setAttribute('playsinline', 'true');
        wrappingRef.current.video!.play();
        requestAnimationFrame(tick);
      })
      .catch(() => toast.error("Impossible d'accéder à la caméra de l'appareil"));

    // Disable camera (by stopping stream tracks) when component is destroyed
    return () => {
      const tracks = streamRef.current?.getTracks() ?? [];
      for (const track of tracks) if (track.enabled) track.stop();
    };
  }, []);

  function drawLine(begin: { x: number; y: number }, end: { x: number; y: number }, color: string) {
    wrappingRef.current!.canvas?.beginPath();
    wrappingRef.current!.canvas?.moveTo(begin.x, begin.y);
    wrappingRef.current!.canvas?.lineTo(end.x, end.y);
    wrappingRef.current!.canvas!.lineWidth = 4;
    wrappingRef.current!.canvas!.strokeStyle = color;
    wrappingRef.current!.canvas?.stroke();
  }

  function tick() {
    if (wrappingRef.current.video!.readyState === wrappingRef.current.video!.HAVE_ENOUGH_DATA) {
      wrappingRef.current.canvasElement!.width = wrappingRef.current.video!.videoWidth;
      wrappingRef.current.canvasElement!.height = wrappingRef.current.video!.videoHeight;
      wrappingRef.current.canvas!.drawImage(
        wrappingRef.current.video!,
        0,
        0,
        wrappingRef.current.canvasElement!.width,
        wrappingRef.current.canvasElement!.height,
      );
      const imageData = wrappingRef.current.canvas!.getImageData(
        0,
        0,
        wrappingRef.current.canvasElement!.width,
        wrappingRef.current.canvasElement!.height,
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
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

export default QRCodeReader;
