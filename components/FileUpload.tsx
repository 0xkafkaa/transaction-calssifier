"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setResponse(""); // Clear previous response
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      setResponse("");

      const formData = new FormData();
      formData.append("file", file);

      // Replace with your API endpoint
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          setResponse("File uploaded successfully!");
        })
        .catch(() => {
          setResponse("Error uploading file.");
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  return (
    <div className="space-y-4">
      {/* File Input and Upload Button */}
      <div className="flex items-center gap-2">
        <Label htmlFor="file-upload" className="cursor-pointer">
          <Button asChild variant="outline">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Choose File</span>
            </div>
          </Button>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </Label>
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Upload"
          )}
        </Button>
      </div>

      {/* Selected File Name */}
      {file && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Selected file:</span>
          <span className="text-sm font-medium text-gray-900">{file.name}</span>
        </div>
      )}

      {/* Response Message */}
      {response && (
        <div
          className={`mt-2 flex items-center gap-2 text-sm ${
            response.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {response.includes("successfully") ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{response}</span>
        </div>
      )}
    </div>
  );
}
