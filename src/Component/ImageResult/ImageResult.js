import React from "react";
import "./ImageResults.css";

const ImageResults = ({ images, onSelectImage }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.webformatURL} alt={image.tags} />
          <button
            onClick={() => onSelectImage(image.webformatURL)}
            className="add-caption-button"
          >
            Add Captions
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
