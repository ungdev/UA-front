'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/named
import { centerCrop, Crop, makeAspectCrop, PercentCrop, ReactCrop } from 'react-image-crop';
import background from '@/../public/images/background.jpg';

import 'react-image-crop/dist/ReactCrop.css';
import './CustomReactCrop.scss';
import { Button, Title } from '@/components/UI';
import Icon, { IconName } from '@/components/UI/Icon';
import TeamMember from '@/components/landing/TeamMember';
import { toast } from 'react-toastify';
import { uploadProfilePicture } from '@/modules/users';
import { useAppDispatch } from '@/lib/hooks';
import { type Action } from '@reduxjs/toolkit';

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
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<string | undefined>();
  const [crop, setCrop] = useState<Crop>();
  const [slide, setSlide] = useState(0);
  const [canGoToNextSlide, setCanGoToNextSlide] = useState(false);
  const croppingImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onCrop = (c: PercentCrop) => {
    setCrop(c);
    if (!croppingImageRef.current || !canvasRef.current || !crop) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.drawImage(
      croppingImageRef.current,
      croppingImageRef.current.naturalWidth * (crop.x / 100),
      croppingImageRef.current.naturalHeight * (crop.y / 100),
      croppingImageRef.current.naturalWidth * (crop.width / 100),
      croppingImageRef.current.naturalHeight * (crop.height / 100),
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
  };

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
      <>
        <div className={styles.cropImageSlideContainer}>
          <div className={styles.cropImageContainer}>
            <ReactCrop
              crop={crop}
              onChange={(_, c) => onCrop(c)}
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
            <h3 style={{ textAlign: 'center' }}>Preview sur le trombi</h3>
            {canvasRef.current && (
              <TeamMember
                color="#123455"
                member={{
                  image: canvasRef.current.toDataURL(),
                  job: 'test',
                  name: 'Alexandre (encore lui)',
                }}></TeamMember>
            )}
          </div>
          <div>
            <h3 style={{ textAlign: 'center' }}>Preview du badge</h3>
            <div className={styles.result}>
              <img alt="Arrière plan du résultat" className={styles.background} src={background.src} />
              <div className={styles.imageWrapper}>
                <canvas className={styles.image} ref={canvasRef} width={300} height={300} />
              </div>
            </div>
          </div>
        </div>
        <Button
          primary
          onClick={() =>
            !canvasRef.current
              ? toast.warn(
                  'Wow, tu cliques plus vite que ton ombre (ou que ton pc, à voir), attends encore quelques millisecondes, même si pour toi ça doit être une éternité',
                )
              : canvasRef.current.toBlob((blob) => blob && dispatch(uploadProfilePicture(blob) as unkown as Action))
          }>
          Définir comme image de profil
        </Button>
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
    <div id="badge-page" className={styles.page}>
      <Title level={1} align="center">
        Badge
      </Title>
      <div className={styles.content}>
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
