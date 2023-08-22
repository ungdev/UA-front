'use client';
import { ChangeEvent, useRef, useState } from 'react';

/**
 * Renders a component that allows the user to upload a file.
 */
const FileUpload = ({
  label,
  value,
  onChange,
  type,
}: {
  /** The label to display. */
  label: string;
  /** The value of the file. */
  value: string;
  /** The function to call when the file changes. */
  onChange: (file: File) => void;
  /** The type of file to accept. */
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

      {value !== '' && type != 'pdf' && <img src={value} alt={label} />}

      <button onClick={handleUploadClick}>{file ? `${file.name}` : 'Click to select'}</button>

      <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept={`.${type}`} />
    </div>
  );
};

export default FileUpload;
