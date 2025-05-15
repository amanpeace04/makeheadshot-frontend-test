// utils/faceValidation.js
// JS-based face validation using face-api.js
import * as faceapi from "face-api.js";

// 1. Load the Tiny Face Detector model
export async function loadFaceModels(modelPath = "/models") {
  await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
}

// 2. Validate images purely on face coverage percentage (minFacePercent)
export async function validateFaces(files, minFacePercent = 8) {
  const details = [];
  let validCount = 0;

  for (const file of files) {
    // Convert file to image element
    const img = await fileToImage(file);

    // Detect faces
    const detections = await faceapi.detectAllFaces(
      img,
      new faceapi.TinyFaceDetectorOptions()
    );

    // Compute face area coverage
    const faceArea = detections.reduce(
      (sum, det) => sum + det.box.width * det.box.height,
      0
    );
    const totalArea = img.width * img.height;
    const facePercent = (faceArea / totalArea) * 100;

    // Valid if coverage ≥ threshold
    const isValid = facePercent >= minFacePercent;
    if (isValid) validCount++;

    details.push({
      filename: file.name,
      face_count: detections.length,
      face_percent: facePercent,
      valid: isValid,
    });
  }

  return {
    status: validCount === files.length ? "success" : "error",
    valid: details.filter((d) => d.valid).map((d) => d.filename),
    valid_count: validCount,
    required: files.length,
    details,
  };
}

// Helper: file → HTMLImageElement
function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
