'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import styles from './QrScanner.module.scss';

interface Props {
  onScan: (result: string) => void;
}

export default function QrScanner({ onScan }: Props) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const html5Qr = new Html5Qrcode(scannerRef.current.id, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false,
    });

    html5QrRef.current = html5Qr;

    const startScanner = async () => {
      try {
        // Force BACK CAMERA on mobile
        const devices = await Html5Qrcode.getCameras();
        const backCamera = devices.find((d) => d.label.toLowerCase().includes('back'))?.id || devices[0]?.id;

        await html5Qr.start(
          backCamera,
          {
            fps: 10,
            qrbox: (w, h) => {
              const size = Math.min(w, h) * 0.5;
              return { width: size, height: size };
            },
            aspectRatio: 1.777, // 16/9
          },
          (decoded) => onScan(decoded),
          () => {},
        );
      } catch (err) {
        console.error('QR Scanner failed:', err);
      }
    };

    startScanner();

    return () => {
      html5Qr
        .stop()
        .then(() => html5Qr.clear())
        .catch(() => {});
    };
  }, [onScan]);

  return <div id="qr-scanner" ref={scannerRef} className={styles.scanner} />;
}
