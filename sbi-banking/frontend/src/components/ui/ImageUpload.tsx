'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Camera, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  currentImage?: string | null;
  onUpload?: (url: string) => void;
  onDelete?: () => void;
  className?: string;
}

export function ImageUpload({
  currentImage,
  onUpload,
  onDelete,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, GIF, or WebP.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/v1/upload/profile-image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast.success('Image uploaded successfully!');
      onUpload?.(data.url);
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  }, [currentImage, onUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch('/api/v1/upload/profile-image', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        setPreview(null);
        toast.success('Image removed successfully!');
        onDelete?.();
      }
    } catch (error) {
      toast.error('Failed to remove image.');
    }
  };

  return (
    <div className={clsx('relative', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Preview / Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'relative w-32 h-32 rounded-full overflow-hidden cursor-pointer',
          'border-2 border-dashed transition-all duration-200',
          'flex items-center justify-center',
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50',
          preview && 'border-0'
        )}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-xs text-gray-500">Uploading...</span>
          </div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload className="w-8 h-8" />
            <span className="text-xs text-center px-2">
              Drop image or click
            </span>
          </div>
        )}
      </div>

      {/* Remove Button */}
      {preview && !isUploading && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className={clsx(
            'absolute -top-1 -right-1 p-1.5 rounded-full',
            'bg-red-500 text-white hover:bg-red-600',
            'transition-colors duration-200',
            'shadow-md'
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default ImageUpload;
