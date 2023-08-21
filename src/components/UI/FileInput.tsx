'use client';
import { ChangeEvent, useRef, useState } from 'react';

const FileUpload = ({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (file: File) => void;
  type: 'png' | 'jpg' | 'pdf';
}) => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => inputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
    onChange(e.target.files[0]);
  };

  return (
    <div>
      <div>{label}</div>

      {value !== '' && <img src={value} alt={label} />}

      <button onClick={handleUploadClick}>{file ? `${file.name}` : 'Click to select'}</button>

      <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept={`.${type}`} />
    </div>
  );
};

export default FileUpload;
