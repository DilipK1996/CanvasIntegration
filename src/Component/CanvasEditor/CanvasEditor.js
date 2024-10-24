import { Canvas, Circle, FabricImage, IText, Rect } from "fabric";
import React, { useEffect, useRef } from "react";
import "./CanvasEditor.css";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);

  useEffect(() => {
    canvasInstance.current = new Canvas(canvasRef.current, {
      width: 900,
      height: 400,
      backgroundColor: "#f3f3f3",
      marginBottom: 50
    });
    return () => {
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (imageUrl) {
      let imageSource = document.getElementById("myImg");
      const image = new FabricImage(imageSource);
      image?.set({ crossOrigin: 'anonymous' }); 
      canvasInstance.current.add(image)
    }
  }, [imageUrl]);

  const addText = () => {
    const text = new IText("Edit me!", {
      left: 100,
      top: 100,
      fill: "black",
      fontSize: 30,
    });
    canvasInstance.current.add(text);
  };

  const addCircle = () => {
    const circle = new Circle({
      radius: 50,
      fill: "green",
      left: 150,
      top: 150,
    });
    canvasInstance.current.add(circle);
  };

  const addRectangle = () => {
    const rect = new Rect({
      width: 100,
      height: 100,
      fill: "blue",
      left: 200,
      top: 200,
    });
    canvasInstance.current.add(rect);
  };

  const downloadImage = () => {
    const myCanvas = document.getElementById("canvas")
    const dataURL = myCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="canvas-editor">
      <div style={{ display: 'none' }}>
        <img src={imageUrl} id="myImg" />
      </div>
      <canvas ref={canvasRef} id="canvas" />
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
