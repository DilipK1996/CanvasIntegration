import React, { useState } from 'react';
import './App.css';
import CanvasEditor from './Component/CanvasEditor/CanvasEditor';
import ImageResults from './Component/ImageResult/ImageResult';
import SearchBar from './Component/SearchBar/SearchBar';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchComplete = (results) => {
    setImages(results);
  };

  const handleSelectImage = (imageUrl) => {
    console.log("Selected Image URL: ", imageUrl); // Debugging: Check if the image URL is passed correctly
    setSelectedImage(imageUrl);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Image Search & Editor</h1>
      <SearchBar onSearchComplete={handleSearchComplete} />
      <div className="content-area">
        {images.length > 0 && !selectedImage && (
          <ImageResults images={images} onSelectImage={handleSelectImage} />
        )}
        {selectedImage && <CanvasEditor imageUrl={selectedImage} />}
      </div>
    </div>
  );
}

export default App;
