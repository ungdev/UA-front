'use client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import QrScanner from 'qr-scanner';
import { Button } from '.';

/**
 * Renders a component that allows the user to scan a QR code.
 */
const QRCodeReader = ({
  onCode,
  className = '',
}: {
  /** The function to call when a QR code is scanned. */
  onCode: (code: QrScanner.ScanResult) => void;
  /** An optional class name to add to the component. */
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [scanner, setScanner] = useState<QrScanner | null>(null);

  useEffect(() => {
    const video = videoRef.current!;
    setScanner(new QrScanner(video, (result) => {
      onCode(result);
    }, {
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }));

    scanner?.start().catch((error) => {
      toast.error('Impossible d\'accéder à la caméra.');
      console.error(error);
    });

    return () => {
      scanner?.destroy();
    };
  }, []);

  return (
    <div className={className}>
      <video ref={videoRef}></video>
      <Button onClick={
        () => {
          setIsEnabled((prev) => !prev);
          if (isEnabled) {
            scanner?.stop();
          } else {
            scanner?.start();
          }
        }
      }>
        {isEnabled ? 'Désactiver' : 'Activer'}
      </Button>
    </div>
  );
};

export default QRCodeReader;
