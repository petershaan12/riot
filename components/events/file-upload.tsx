import { CloudUploadIcon } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";

type FileUploaderProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
};

const FileUploader = ({ imageUrl, onFieldChange }: FileUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const [error, setError] = useState<string | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      if (validTypes.includes(fileType)) {
        if (file.size < 1024 * 1024 * 10) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreviewUrl(base64String);
            onFieldChange(base64String);
          };
          reader.readAsDataURL(file);
        } else {
          setError("Image is more than 10MB");
        }
      } else {
        setError("Only .png or .jpg files are accepted");
      }
    }
  };

  return (
    <>
      <div className="border border-dashed h-full w-full rounded-md relative overflow-hidden">
        <input
          type="file"
          className="cursor-pointer block opacity-0 w-full relative z-20 h-[300px] border border-red-500"
          onChange={handleFileChange}
        />
        <div className="text-center flex flex-col items-center justify-center p-4 absolute top-0 right-0 left-0 m-auto h-full">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <CloudUploadIcon className="w-10 h-10 text-white" />
              <p className="text-sm mt-2 text-white/40">
                Drop files anywhere
                <br />
                or
              </p>
              <p className="text-sm text-white/40">Select Files</p>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
