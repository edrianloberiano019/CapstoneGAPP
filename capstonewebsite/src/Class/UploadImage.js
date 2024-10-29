import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "./firebaseConfig"; 
import { toast } from "react-toastify";
import Loading from "./Loading";
import { motion } from 'framer-motion';

const ImageComponent = () => {
  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [uploading, setUploading] = useState({
    image1: false,
    image2: false,
    image3: false,
  });
  const [imageUrls, setImageUrls] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [loading, setLoading] = useState(true); 

  const handleFileChange = (imageKey) => (e) => {
    if (e.target.files[0]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [imageKey]: e.target.files[0],
      }));
    }
  };

  const handleUpload = (imageKey) => {
    const file = files[imageKey];
    if (!file) return;

    const storageRef = ref(storage, `images/${imageKey}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading((prev) => ({
      ...prev,
      [imageKey]: true,
    }));

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading((prev) => ({
          ...prev,
          [imageKey]: false,
        }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrls((prevUrls) => ({
            ...prevUrls,
            [imageKey]: downloadURL,
          }));
          setUploading((prev) => ({
            ...prev,
            [imageKey]: false,
          }));
          toast.success(`Successfully uploaded`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        });
      }
    );
  };

  const handleRemove = (imageKey) => {
    const storageRef = ref(storage, `images/${imageKey}`);

    deleteObject(storageRef)
      .then(() => {
        toast.success(`${imageKey} deleted successfully`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
        setImageUrls((prevUrls) => ({
          ...prevUrls,
          [imageKey]: null,
        }));
        setFiles((prevFiles) => ({
          ...prevFiles,
          [imageKey]: null, 
        }));
      })
      .catch((error) => {
        toast.error(`Failed to delete ${imageKey}:`, error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imageKeys = ["image1", "image2", "image3"];
      let fetchedImages = 0; 

      for (const key of imageKeys) {
        const imageRef = ref(storage, `images/${key}`);
        try {
          const url = await getDownloadURL(imageRef);
          setImageUrls((prevUrls) => ({
            ...prevUrls,
            [key]: url,
          }));
        } catch (error) {
          console.error(`Error fetching ${key} URL: `, error);
        } finally {
          fetchedImages += 1;
          if (fetchedImages === imageKeys.length) {
            setLoading(false);  
          }
        }
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex space-x-8 mt-4 h-full overflow-hidden"> 
      {["image1", "image2", "image3"].map((imageKey, index) => (
        <motion.div key={imageKey} className="flex w-full flex-col"
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}   
          transition={{ duration: 0.5 }}   
        >
          <div className="flex w-full flex-col items-center">
            {imageUrls[imageKey] && (
              <img
                className="rounded-xl shadow-md max-w-[500px] h-[300px] object-cover"
                src={imageUrls[imageKey]}
                alt={`Uploaded ${index + 1}`}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            )}
          </div>
          <div className="flex justify-end my-6">
            <div>
              
              <input
                type="file"
                id={`fileInput${index + 1}`}
                style={{ display: "none" }}
                onChange={handleFileChange(imageKey)}
              />
              <label
                className="text-black text-xl"
                htmlFor={`fileInput${index + 1}`}
                style={styles.button}
              >
                {files[imageKey] ? "Change File" : "Choose Files"}
              </label>
            </div>
            <button
              className="bg-red-500 text-xl px-4 text-white mx-2 rounded-xl"
              onClick={() => handleRemove(imageKey)}
            >
              <div>Remove</div>
            </button>
            <button
              className="bg-green-600 text-white text-xl px-4 rounded-xl"
              onClick={() => handleUpload(imageKey)}
              disabled={uploading[imageKey] || !files[imageKey]}
            >
              {uploading[imageKey] ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    color: "black",
    cursor: "pointer",
    borderRadius: "5px",
    display: "inline-block",
  },
};

export default ImageComponent;
