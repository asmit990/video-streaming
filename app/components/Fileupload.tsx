 // lmao str8 from imagekit


 "use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { VIDEO_DIMENSIONS } from '../../model/Video';
interface FileUploadprop {
    onSuccess: (res:any) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}


const Fileupload = ({
     onSuccess,
    onProgress,
    fileType
}: FileUploadprop) => {
  
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null >(null)


    const validateFile = (file: File) => {
        if (fileType === "video") {
          if (!file.type.startsWith("video/")) {
            setError("please upload a valid video file ");
            return false;
          }
        }
        if (file.size > 100 * 1024 * 1024) {
          setError("size is too large");
          return false;
        }
        return true;
      };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(!file || !validateFile(file)) return ;

        setUploading(true)
        setError(null)

        try{
            await fetch("/api/auth/imagekit-auth")
        }
        
  
    }

    return (
    <>
    <input
    type="file"
    accept={fileType === "video" ? "video/*" : "image/*"}
    onChange={handleFileChange}
    />
    {uploading && (
        <span>
            loading .....
        </span>
    )}
    </>
)
}




export default Fileupload;