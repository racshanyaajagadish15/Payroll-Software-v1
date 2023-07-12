import React, { useState } from 'react';
import axios from 'axios';
import './AttendanceUpload.css';

function AttendanceUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios
        .post('/upload-excel', formData)
        .then((response) => {
          console.log(response.data);
          // Handle successful upload
          setUploadedFiles((prevFiles) => [...prevFiles, selectedFile.name]);
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleFileDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div className="attendance-upload-container">
      <h2>Attendance Upload</h2>
      <div
        className={`file-upload ${isDraggingOver ? 'dragging-over' : ''}`}
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
      >
        <div className="drag-drop-box">
          <p>Drag and drop files here</p>
        </div>
        <label htmlFor="file-input" className="file-label">
          or choose a file from your computer
        </label>
        <input
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AttendanceUpload;
