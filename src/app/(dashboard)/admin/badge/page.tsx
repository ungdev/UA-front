'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useRef, useState } from 'react';
// eslint-disable-next-line import/named
import { centerCrop, Crop, makeAspectCrop, PercentCrop, ReactCrop } from 'react-image-crop';
import background from '@/../public/images/background.webp';

import 'react-image-crop/dist/ReactCrop.css';
import './CustomReactCrop.scss';
import { Button, Title } from '@/components/UI';
import Icon, { IconName } from '@/components/UI/Icon';
import TeamMember from '@/components/landing/TeamMember';
import { toast } from 'react-toastify';
import { uploadProfilePicture } from '@/modules/users';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
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
  const user = useAppSelector((state) => state.login.user);
  const [file, setFile] = useState<string | undefined>();
  const [crop, setCrop] = useState<Crop>();
  const [slide, setSlide] = useState(0);
  const [canGoToNextSlide, setCanGoToNextSlide] = useState(false);
  const croppingImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleToPreview, setRoleToPreview] = useState(0);

  const onCrop = (c: PercentCrop) => {
    setCrop(c);
    if (!croppingImageRef.current || !canvasRef.current || !c) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.drawImage(
      croppingImageRef.current,
      croppingImageRef.current.naturalWidth * (c.x / 100),
      croppingImageRef.current.naturalHeight * (c.y / 100),
      croppingImageRef.current.naturalWidth * (c.width / 100),
      croppingImageRef.current.naturalHeight * (c.height / 100),
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
            <TeamMember
              color={user!.orgaRoles[roleToPreview].commissionRole}
              member={user!}
              role={user!.orgaRoles[roleToPreview].commissionRole}
              image={canvasRef.current?.toDataURL() ?? ''}
            />
          </div>
          <div>
            <h3 style={{ textAlign: 'center' }}>Preview du badge</h3>
            <div className={styles.badgePreview}>
              <img alt="Arrière plan du badge" className={styles.background} src={background.src} />
              <div className={styles.imageWrapper}>
                <canvas className={styles.image} ref={canvasRef} width={300} height={300} />
              </div>
            </div>
          </div>
        </div>
        {user!.orgaRoles.length > 1 && (
          <div className={styles.changePreviewRole}>
            Preview avec tes autres rôles
            <div className={styles.changePreviewRoleArrows}>
              <Icon
                name={IconName.ChevronLeft}
                onClick={() => {
                  setRoleToPreview(roleToPreview - 1);
                }}
                className={roleToPreview === 0 ? styles.disabled : ''}
              />
              {user!.orgaRoles[roleToPreview].commissionRole === 'respo' ? 'Responsable' : 'Membre'}{' '}
              {user!.orgaRoles[roleToPreview].commission.name}
              <Icon
                name={IconName.ChevronRight}
                onClick={() => {
                  setRoleToPreview(roleToPreview + 1);
                }}
                className={roleToPreview === user!.orgaRoles.length - 1 ? styles.disabled : ''}
              />
            </div>
          </div>
        )}
        <Button
          primary
          onClick={() =>
            !canvasRef.current
              ? toast.warn(
                  'Wow, tu cliques plus vite que ton ombre (ou que ton pc, à voir), attends encore quelques millisecondes, même si pour toi ça doit être une éternité',
                )
              : canvasRef.current.toBlob((blob) => blob && dispatch(uploadProfilePicture(blob) as unknown as Action))
          }>
          Définir comme image de profil
        </Button>
      </>
    );
  };

  const slides = [selectImageSlide, cropImageSlide];

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    onCrop(centerAspectCrop(width, height, 1));
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
