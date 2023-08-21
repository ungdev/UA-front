import { toast } from 'react-toastify';
import { uploads } from './api';

export const uploadFile = async (file: File, name: string, path: string) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('path', path);
  formData.append('file', file);

  const response = await uploads.send('admin/upload', formData);

  if (response.status === 0) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }

  return response;
};

export const deleteFile = async (path: string) => {
  const response = await uploads.delete('admin/delete/' + encodeURIComponent(path));

  if (response.status === 0) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }

  return response;
}