import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const FabricCanvas = ({ typeIndex }) => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const playerImageBodyUrl = "/drawing-2.svg";
  const playerImageGunUrl = "/bitmap2.svg";
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); // Ref to hold the canvas instance

  // Initialize the canvas
  useEffect(() => {
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "blue",
    });

    // Function to add the body image
    const addBodyImage = () => {
      fabric.loadSVGFromURL(playerImageBodyUrl, (objects, options) => {
        const svg = fabric.util.groupSVGElements(objects, options);
        svg.set({
          left: 500, // Adjust horizontal position
          top: 150, // Adjust vertical position
          scaleX: 0.5, // Scale down to half size (adjust as needed)
          scaleY: 0.5, // Scale down to half size (adjust as needed)
          selectable: false,
          lockMovementX: true,
          lockMovementY: true,
        });
        canvasInstance.current.add(svg).renderAll();
      });
    };

    // Function to add the gun image
    const addGunImage = () => {
      const existingObject = canvasInstance.current
        .getObjects()
        .find((obj) => obj.name === "playerGun");
      if (!existingObject) {
        fabric.loadSVGFromURL(playerImageGunUrl, (objects, options) => {
          const svg = fabric.util.groupSVGElements(objects, options);
          svg.set({
            name: "playerGun",
            left: 725, // Adjust horizontal position
            top: 205, // Adjust vertical position
            scaleX: 0.5, // Scale (adjust as needed)
            scaleY: 0.5, // Scale (adjust as needed)
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            angle: -35,
            originX: "right", // Set rotation origin when creating the object
            originY: "center",
          });

          canvasInstance.current.add(svg).renderAll();
        });
      }
    };

    // Call the functions to add SVGs
    addBodyImage();
    addGunImage();
    console.log(canvasInstance.current.getObjects());

    return () => {
      canvasInstance.current.dispose();
    };
  }, []);
  const handleKeydown = () => {
    // Function to generate normally distributed numbers
    const canvas = canvasInstance.current;
    const objectToRotate = canvas
      .getObjects()
      .find((obj) => obj.name === "playerGun");

    const generateGaussianRandom = (mean, sd) => {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return (
        Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * sd + mean
      );
    };

    if (objectToRotate && objectToRotate.angle < -5) {
      objectToRotate.set("angle", objectToRotate.angle + 2);
      objectToRotate.set("top", objectToRotate.top + 0.5);
      console.log(objectToRotate.angle);
      canvas.renderAll(); // Re-render the canvas to reflect the change
    } else {
      const centerX = canvas.getWidth() / 2 - 250;
      const centerY = canvas.getHeight() / 2 - 75;
      const sd = Math.min(canvas.getWidth(), canvas.getHeight()) / 8; // Standard deviation

      const x = generateGaussianRandom(centerX, sd);
      const y = generateGaussianRandom(centerY, sd);

      // Rest of the code to create and animate the circle
      const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`;
      const circle = new fabric.Circle({
        radius: 5,
        fill: randomColor,
        left: x,
        top: y,
        originX: "center",
        originY: "center",
      });
      if (canvas) {
        canvas.add(circle);
      }
      circle.animate("opacity", 0, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 10000,
        onComplete: () => {
          canvas.remove(circle);
        },
      });
    }
    let playerGuns = canvas
      .getObjects()
      .filter((obj) => obj.name === "playerGun");

    // Check for extra 'playerGun' objects and remove them
    if (playerGuns.length > 1) {
      // Start from the second object as the first one is the original
      for (let i = 1; i < playerGuns.length; i++) {
        canvas.remove(playerGuns[i]);
      }
      canvas.renderAll(); // Re-render the canvas after removal
    }
  };

  useEffect(() => {
    if (canvasInstance.current) {
      handleKeydown();
    }
  }, [typeIndex]);

  return <canvas ref={canvasRef} />;
};

export default FabricCanvas;
