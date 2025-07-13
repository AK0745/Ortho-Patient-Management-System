import React, { useState, useRef } from 'react';
import { UploadedFile } from '../types/Patient';
import { Upload, File, Image, FileText, X, Download, Eye } from 'lucide-react';

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange, maxFiles = 10 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UploadedFile['category']>('other');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(fileList).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) return;
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please upload JPEG, PNG, or PDF files.`);
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString(),
          dataUrl: e.target?.result as string,
          category: selectedCategory,
        };
        
        newFiles.push(newFile);
        if (newFiles.length === Array.from(fileList).length) {
          onFilesChange([...files, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId));
  };

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.dataUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: UploadedFile['category']) => {
    switch (category) {
      case 'xray': return 'bg-blue-100 text-blue-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'lab-report': return 'bg-purple-100 text-purple-800';
      case 'referral': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800">Medical Reports & Files</h4>
        <span className="text-sm text-gray-500">{files.length}/{maxFiles} files</span>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">File Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as UploadedFile['category'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="xray">X-Ray / Imaging</option>
          <option value="prescription">Prescription</option>
          <option value="lab-report">Lab Report</option>
          <option value="referral">Referral</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={files.length >= maxFiles}
        />
        
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop files here, or click to select
        </p>
        <p className="text-xs text-gray-500">
          Supports JPEG, PNG, PDF files up to 10MB each
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h5 className="font-medium text-gray-700">Uploaded Files</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 text-gray-500">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full ${getCategoryColor(file.category)}`}>
                        {file.category.replace('-', ' ')}
                      </span>
                      <span>•</span>
                      <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') && (
                    <button
                      onClick={() => window.open(file.dataUrl, '_blank')}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => downloadFile(file)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;