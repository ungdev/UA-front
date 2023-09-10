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
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => inputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    onChange(e.target.files[0]);
  };

  return (
    <div className='fileinput'>
      <label>{label}</label>

      <div className="imageContainer" onClick={handleUploadClick}>
        {!error && (value !== '' || preview != null) && type != 'pdf' && <img onError={
          (e) => {
            setError(true);
            setPreview(null);
          }
        } src={preview ? preview : value} alt={label} />}

        {!error && (value !== '' || preview != null) && type == 'pdf' && <><embed onLoad={
          (e) => {
            // check if 404 error is thrown
            fetch(value).then((response) => {
              if (!response.ok) {
                setError(true);
                setPreview(null);
              }
            });
          }
        }
      type="application/pdf" src={preview ? preview : value} />
      <div className='pdf-overlay'/>
      </>}

        <p className={(error || (value === '' && preview === null)) ? 'black' : ''}>Choisir un fichier {type.toUpperCase()}</p>
      </div>   

      <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept={`.${type}`} />
    </div>
  );
};

export default FileUpload;
