import { CloudUploadIcon } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";

type FileUploaderProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);

      setPreviewUrl(fileUrl);
      setFiles([file]);
      onFieldChange(fileUrl);
    }
  };

  return (
    <>
      <div className="border border-dashed h-full rounded-md relative overflow-hidden">
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
              <CloudUploadIcon className="w-10 h-10 text-gray-400" />
              <h4 className="text-sm mt-2 text-slate-500">
                Drop files anywhere to upload
                <br />
                or
              </h4>
              <p className="text-sm text-slate-500">Select Files</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
