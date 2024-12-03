import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null); // Store the selected file
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [extractedText, setExtractedText] = useState(""); // Store the extracted text
  const [uploadSuccess, setUploadSuccess] = useState(false); // Track upload success

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
    setUploadSuccess(false); // Reset upload success state
    setExtractedText(""); // Clear previous extracted text
  };

  // Handle file upload
  const handleUploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(0); // Reset progress
      console.log("Uploading file...");

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Upload failed:", error);
        alert(`Error: ${error.error}`);
        return;
      }

      console.log("File uploaded successfully!");
      setUploadSuccess(true); // Mark upload as successful
      setUploadProgress(100); // Update progress
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred during file upload. Please try again.");
    }
  };

  // Handle text extraction
  const handleExtractText = async () => {
    if (!uploadSuccess) {
      alert("Please upload a file first.");
      return;
    }

    try {
      console.log("Extracting text...");
      const response = await fetch("http://localhost:5000/extract-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Text extraction failed:", error);
        alert(`Error: ${error.error}`);
        return;
      }

      const data = await response.json();
      console.log("Text extracted successfully:", data.extracted_text);
      setExtractedText(data.extracted_text.join("\n"));
    } catch (error) {
      console.error("Unexpected error during text extraction:", error);
      alert("An unexpected error occurred during text extraction. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "36px" }}>Math Question Bot</h1>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
          Upload your math question images and get the extracted text instantly!
        </p>
      </div>

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label style={{ display: "block", marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
          Select Image File:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            display: "block",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
          }}
        />
        <button
          onClick={handleUploadFile}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Upload File
        </button>
        <button
          onClick={handleExtractText}
          disabled={!uploadSuccess}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: uploadSuccess ? "#007BFF" : "#cccccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: uploadSuccess ? "pointer" : "not-allowed",
          }}
        >
          Extract Text
        </button>
        <p style={{ marginTop: "20px", fontSize: "16px", color: "#555" }}>
          <strong>Upload Progress:</strong> {uploadProgress}%
        </p>
      </div>

      {extractedText && (
        <div
          style={{
            maxWidth: "600px",
            margin: "20px auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginTop: "0", marginBottom: "10px", fontSize: "24px", color: "#4CAF50" }}>Extracted Text:</h2>
          <div
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "left",
              margin: "10px 0",
              fontSize: "16px",
              color: "#333",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            {extractedText}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
