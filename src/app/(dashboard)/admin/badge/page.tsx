'use client';
import styles from './style.module.scss';
import FileUpload from '@/components/UI/FileInput';
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/named
import { centerCrop, Crop, makeAspectCrop, PercentCrop, ReactCrop } from 'react-image-crop';
import background from '@/../public/images/badge-preview-background.webp';

import 'react-image-crop/dist/ReactCrop.css';
import './CustomReactCrop.scss';
import { Button, Title } from '@/components/UI';
import Icon, { IconName } from '@/components/UI/Icon';
import TeamMember from '@/components/landing/TeamMember';
import { toast } from 'react-toastify';
import { uploadProfilePicture } from '@/modules/users';
import { useAppSelector } from '@/lib/hooks';
import Checkbox from '@/components/UI/Checkbox';

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
  const user = useAppSelector((state) => state.login.user);
  const [file, setFile] = useState<string | undefined>();
  const [crop, setCrop] = useState<Crop>();
  const [slide, setSlide] = useState(0);
  const [canGoToNextSlide, setCanGoToNextSlide] = useState(false);
  const croppingImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleToPreview] = useState(0);
  const [displayName, setDisplayName] = useState(false);
  const [displayUsername, setDisplayUsername] = useState(false);
  const [displayPhoto, setDisplayPhoto] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')!;
      ctx.fillStyle = backgroundColor;
      ctx.rect(0, 0, 300, 300);
      onCrop(crop as PercentCrop);
    }
  }, [canvasRef.current, croppingImageRef.current, backgroundColor]);

  const nextSlide = () => {
    if (slide === 1) {
      if (!canvasRef.current) {
        toast.warn(
          'Wow, tu cliques plus vite que ton ombre (ou que ton pc, à voir), attends encore quelques millisecondes, même si pour toi ça doit être une éternité',
        );
        return;
      } else {
        canvasRef.current.toBlob((blob) => setBlob(blob));
      }
    }
    setCanGoToNextSlide(slide === 0);
    setSlide(slide + 1);
  };

  const onCrop = (c: PercentCrop) => {
    setCrop(c);
    if (!croppingImageRef.current || !canvasRef.current || !c) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.fill();
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
          image.onload = () => setCanGoToNextSlide(image.width >= 300 && image.height >= 300);
        }}
        type={['png', 'jpg', 'webp']}
        className={styles.fileUpload}
        bg="#002D40"
      />
      <div className={`${styles.warning} ${!file || canGoToNextSlide ? styles.hidden : ''}`}>
        L'image doit avoir une taille minimale de 300x300 pixels
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
              <img alt="Image à cropper" src={file} onLoad={onImageLoad} ref={croppingImageRef} />
            </ReactCrop>
            <div className={styles.backgroundColorSelect}>
              Couleur d'arrière plan :
              <div className={`${styles.color} ${styles.whiteColor}`} onClick={() => setBackgroundColor('#ffffff')} />
              <div className={`${styles.color} ${styles.blueColor}`} onClick={() => setBackgroundColor('#002D40')} />
            </div>
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
        {/* {user!.orga!.roles.length > 1 && (
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
              {user!.orga!.roles[roleToPreview].commissionRole === 'respo' ? 'Responsable' : 'Membre'}{' '}
              {user!.orga!.roles[roleToPreview].commission.name}
              <Icon
                name={IconName.ChevronRight}
                onClick={() => {
                  setRoleToPreview(roleToPreview + 1);
                }}
                className={roleToPreview === user!.orga!.roles.length - 1 ? styles.disabled : ''}
              />
            </div>
          </div>
        )} */}
      </>
    );
  };

  const privacyPreferencesSlide = () => {
    return (
      <>
        <div>
          <Checkbox label="Afficher le nom" value={displayName} onChange={setDisplayName} />
          <Checkbox
            label="Afficher le pseudo"
            value={displayUsername}
            onChange={setDisplayUsername}
            className={`${styles.pseudoCheckbox} ${!displayName ? styles.hide : ''}`}
          />
        </div>
        <Checkbox label="Afficher la photo" value={displayPhoto} onChange={setDisplayPhoto} />
        <div>
          <Title align="center" level={3} type={3}>
            Preview sur le trombi
          </Title>
          {user!.orga!.roles.length > 0 ? (
            <TeamMember
              color={user!.orga!.roles[roleToPreview].commission.color}
              member={{
                ...user!,
                name: displayName ? user?.firstname + ' ' + user?.lastname : undefined,
                username: displayUsername || !displayName ? user?.username : undefined,
              }}
              role={user!.orga!.roles[roleToPreview].commissionRole}
              image={blob && displayPhoto ? URL.createObjectURL(blob)! : undefined}
            />
          ) : (
            "Vous n'avez pas de commission assignée"
          )}
        </div>
        <Button
          primary
          onClick={() => uploadProfilePicture(blob!, displayName, !displayName || displayUsername, displayPhoto)}>
          Enregistrer
        </Button>
      </>
    );
  };

  const slides = [selectImageSlide, cropImageSlide, privacyPreferencesSlide];

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    onCrop(centerAspectCrop(width, height, 1));
  }

  document.documentElement.style.setProperty('--half-size', crop ? `${crop.width / 2}px` : '0px');

  return (
    <div id="badge-page" className={styles.page}>
      <Title level={1} align="center">
        {slide === 2 ? 'Préférences du trombi' : 'Badge'}
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
            onClick={nextSlide}
            className={slide === slides.length - 1 ? styles.invisible : !canGoToNextSlide ? styles.disabled : ''}
          />
        </div>
      </div>
    </div>
  );
}
