"use client";

import { forwardRef, useCallback, useState } from "react";

import { File, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  label: string;
  error?: string;
  className?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  onChange?: (files: File[]) => void;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    label,
    error,
    className = "",
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
    accept = {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onChange,
    ...props
  }, ref) => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
        setFiles(newFiles);
        onChange?.(newFiles);
      },
      [files, maxFiles, onChange],
    );

    const removeFile = useCallback(
      (fileToRemove: File) => {
        const newFiles = files.filter((file) => file !== fileToRemove);
        setFiles(newFiles);
        onChange?.(newFiles);
      },
      [files, onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles,
      maxSize,
      accept,
    });

    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} ref={ref} {...props} />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Drop files here"
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Max {maxFiles} files, up to {maxSize / (1024 * 1024)}MB each
          </p>
        </div>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file) => (
              <li
                key={`${file.name}-${file.size}`}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2"
              >
                <File className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
