'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useState } from 'react';
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

  const selectImageSlide = () => (
    <FileUpload
      label="Upload la photo de ton badge"
      value={'test'}
      onChange={(file) => setFile(URL.createObjectURL(file))}
      type="png"
      className={styles.fileUpload}
      bg="#002D40"
    />
  );

  const cropImageSlide = () => {
    return (
      <>
        <div className={styles.cropImageSlideContainer}>
          <div className={styles.cropImageContainer}>
            {file === undefined ? (
              <p className={styles.error}>
                <b>Veuillez upload votre image !</b>
              </p>
            ) : (
              <ReactCrop
                crop={crop}
                onChange={(_, c) => setCrop(c)}
                minWidth={250}
                aspect={1}
                keepSelection
                circularCrop>
                <img className={styles.croppingImage} alt="Image à cropper" src={file} onLoad={onImageLoad} />
              </ReactCrop>
            )}
          </div>
          <div>
            <h3 style={{ textAlign: 'center' }}>Preview</h3>
            <div className={styles.result}>
              <img alt="Arrière plan du résultat" className={styles.background} src={background.src} />
              <div className={styles.imageWrapper}>
                {file === undefined ? (
                  <div className={styles.fakeImage}></div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const slides = [selectImageSlide, cropImageSlide];

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  document.documentElement.style.setProperty('--half-size', crop ? `${crop.width / 2}px` : '0px');

  return (
    <>
      <div style={{ height: '5vh' }}></div>
      <Title level={1} align="center">
        Badge
      </Title>
      <div id="badge-page" className={styles.badgePage}>
        {slides[slide]()}
        <div className={styles.arrows}>
          <Icon
            name={IconName.ChevronLeft}
            onClick={() => slide > 0 && setSlide(slide - 1)}
            className={slide === 0 ? styles.disabled : ''}
          />
          <Icon
            name={IconName.ChevronRight}
            onClick={() => slide < slides.length - 1 && setSlide(slide + 1)}
            className={slide === slides.length - 1 ? styles.disabled : ''}
          />
        </div>
      </div>
      <div style={{ height: '5vh' }}></div>
    </>
  );
}
