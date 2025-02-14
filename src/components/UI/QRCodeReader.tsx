'use client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '.';
import { Html5Qrcode } from 'html5-qrcode';

interface QRCodeResult {
  data: string;
}

interface QRCodeReaderProps {
  /** Fonction appelée lorsque le QR code est scanné */
  onCode: (code: QRCodeResult) => void;
  /** Classe CSS optionnelle */
  className?: string;
  /** Démarre automatiquement le scanner si true */
  autoStart?: boolean;
}

const QRCodeReader = ({ onCode, className = '', autoStart = false }: QRCodeReaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [cameraId, setCameraId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.id = 'html5qr-reader';
    const html5QrCode = new Html5Qrcode('html5qr-reader');
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (cameras.length > 0) {
          setCameraId(cameras[0].id);
        } else {
          toast.error('Aucune caméra trouvée.');
        }
      })
      .catch((err) => {
        toast.error('Erreur lors de la récupération des caméras.');
        console.error(err);
      });

    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Surveille l'autoStart : dès que c'est true, et que la caméra est disponible, on démarre le scanner
  useEffect(() => {
    if (autoStart && cameraId && !isEnabled) {
      toggleScanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, cameraId]);

  const stopScanner = async () => {
    if (!html5QrCodeRef.current) return;

    try {
      await html5QrCodeRef.current.stop();
      setIsEnabled(false);
    } catch (error) {
      console.warn("Le scanner n'était pas en cours d'exécution :", error);
    }

    try {
      await html5QrCodeRef.current.clear();
    } catch (error) {
      console.warn('Erreur lors du nettoyage du scanner :', error);
    }
  };

  const toggleScanner = () => {
    if (!html5QrCodeRef.current || !cameraId) return;

    if (isEnabled) {
      stopScanner();
    } else {
      const config = { fps: 10, qrbox: 250 };
      html5QrCodeRef.current
        .start(
          cameraId,
          config,
          (decodedText) => {
            onCode({ data: decodedText });
          },
          () => {},
        )
        .then(() => {
          setIsEnabled(true);
        })
        .catch((err) => {
          toast.error("Impossible d'accéder à la caméra.");
          console.error(err);
        });
    }
  };

  return (
    <div className={className}>
      <div ref={containerRef} style={{ width: '100%' }}></div>
      <Button secondary outline onClick={toggleScanner}>
        {isEnabled ? 'Désactiver' : 'Activer'}
      </Button>
    </div>
  );
};

export default QRCodeReader;
