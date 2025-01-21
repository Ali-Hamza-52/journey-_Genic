import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageConfig from '@/database/firebaseConfig';
import { v4 } from 'uuid';

const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const storageRef = ref(imageConfig, `${v4()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        reject(new Error('Image upload failed'));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(new Error('Image upload failed'));
        }
      }
    );
  });
};

const firebaseUploadImageHandler = async (file) => {
  try {
    const imageUrl = await uploadImage(file);
    return imageUrl;
  } catch (error) {
    console.log("error uploading image", error);
    return '404 error';
  }
};

export { firebaseUploadImageHandler };
