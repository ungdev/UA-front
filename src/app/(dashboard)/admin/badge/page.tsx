'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useState } from 'react';
// eslint-disable-next-line import/named
import { centerCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop';
import background from '@/../public/images/background.jpg';

import 'react-image-crop/dist/ReactCrop.css';
import './CustomReactCrop.scss';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function BadgePage() {
  const [file, setFile] = useState<string | undefined>();
  const [crop, setCrop] = useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  document.documentElement.style.setProperty('--half-size', crop ? `${crop.width / 2}px` : '0px');

  return (
    <div id="badge-page" className={styles.badgePage}>
      <FileUpload
        label="La photo sur ton badge"
        value={'test'}
        onChange={(file) => setFile(URL.createObjectURL(file))}
        type="png"
      />
      <ReactCrop crop={crop} onChange={(_, c) => setCrop(c)} minWidth={250} aspect={1} keepSelection circularCrop>
        <img className={styles.croppingImage} alt="Image à cropper" src={file} onLoad={onImageLoad} />
      </ReactCrop>
      <div className={styles.result}>
        <div className={styles.imageWrapper}>
          <img
            alt="Image croppée"
            className={styles.image}
            src={file}
            style={
              crop
                ? {
                    transform: `scale(${100 / crop.width}, ${100 / crop.height})`,
                    left: `${-crop.x}%`,
                    top: `${-crop.y}%`,
                    transformOrigin: `${crop.x}% ${crop.y}%`,
                  }
                : undefined
            }
          />
        </div>
        <img alt="Arrière plan du résultat" className={styles.background} src={background.src} />
      </div>
    </div>
  );
}
