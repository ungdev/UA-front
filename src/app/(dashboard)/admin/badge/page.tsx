'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useRef, useState } from 'react';
// eslint-disable-next-line import/named
import { centerCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop';
import background from '@/../public/images/background.jpg';

import 'react-image-crop/dist/ReactCrop.css';
import './CustomReactCrop.scss';
import { Title } from '@/components/UI';
import Icon, { IconName } from '@/components/UI/Icon';

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
  const [slide, setSlide] = useState(0);
  const [canGoToNextSlide, setCanGoToNextSlide] = useState(false);
  const croppingImageRef = useRef<HTMLImageElement>(null);

  const selectImageSlide = () => (
    <>
      <FileUpload
        label="Upload la photo de ton badge"
        value={file}
        onChange={(file) => {
          const url = URL.createObjectURL(file);
          setFile(url);
          const image = new Image();
          image.src = url;
          image.onload = () => {
            setCanGoToNextSlide(image.width >= 250 && image.height >= 250);
          };
        }}
        type="png"
        className={styles.fileUpload}
        bg="#002D40"
      />
      <div className={`${styles.warning} ${!file || canGoToNextSlide ? styles.hidden : ''}`}>
        L'image doit avoir une taille minimale de 250x250 pixels
      </div>
    </>
  );

  const cropImageSlide = () => {
    return (
      <div className={styles.cropImageSlideContainer}>
        <div className={styles.cropImageContainer}>
          <ReactCrop
            crop={crop}
            onChange={(_, c) => setCrop(c)}
            minWidth={
              croppingImageRef.current
                ? 250 * (croppingImageRef.current.width / croppingImageRef.current.naturalWidth)
                : 0
            }
            aspect={1}
            keepSelection
            circularCrop>
            <img
              className={styles.croppingImage}
              alt="Image à cropper"
              src={file}
              onLoad={onImageLoad}
              ref={croppingImageRef}
            />
          </ReactCrop>
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Preview</h3>
          <div className={styles.result}>
            <img alt="Arrière plan du résultat" className={styles.background} src={background.src} />
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
          </div>
        </div>
      </div>
    );
  };

  const slides = [selectImageSlide, cropImageSlide];

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  document.documentElement.style.setProperty('--half-size', crop ? `${crop.width / 2}px` : '0px');

  return (
    <div id="badge-page" className={styles.page}>
      <Title level={1} align="center">
        Badge
      </Title>
      <div id="badge-page" className={styles.content}>
        {slides[slide]()}
        <div className={styles.arrows}>
          <Icon
            name={IconName.ChevronLeft}
            onClick={() => {
              setSlide(slide - 1);
              setCanGoToNextSlide(true);
            }}
            className={slide === 0 ? styles.invisible : ''}
          />
          <Icon
            name={IconName.ChevronRight}
            onClick={() => {
              setSlide(slide + 1);
              setCanGoToNextSlide(false);
            }}
            className={slide === slides.length - 1 ? styles.invisible : !canGoToNextSlide ? styles.disabled : ''}
          />
        </div>
      </div>
    </div>
  );
}
