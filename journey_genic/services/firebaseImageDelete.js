import imageConfig from "@/database/firebaseConfig";
import { deleteObject, ref } from "firebase/storage";

const firebaseDeleteImageHandler = async (imageUrl) => {
    if (!imageUrl) {
      throw new Error('No image URL provided');
    }
  
    const imageRef = ref(imageConfig, imageUrl);
  
    try {
      await deleteObject(imageRef);
      return 200;

    } catch (error) {
      throw new Error('Image deletion failed');
    }
  };

  export { firebaseDeleteImageHandler}