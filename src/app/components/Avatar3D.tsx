import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface Avatar3DProps {
  bodyMeasurements?: {
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    bodyType: string;
  };
  selectedOutfit?: {
    top?: string;
    bottom?: string;
    dress?: string;
    color?: string;
  };
}

export default function Avatar3D({ bodyMeasurements, selectedOutfit }: Avatar3DProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();

    // Apply transformations
    ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
    ctx.scale(zoom, zoom);
    ctx.rotate((rotation * Math.PI) / 180);

    // Draw avatar based on body measurements
    drawAvatar(ctx, bodyMeasurements);

    // Draw outfit if selected
    if (selectedOutfit) {
      drawOutfit(ctx, selectedOutfit, bodyMeasurements);
    }

    // Restore context state
    ctx.restore();
  }, [rotation, zoom, position, bodyMeasurements, selectedOutfit]);

  const drawAvatar = (
    ctx: CanvasRenderingContext2D,
    measurements?: Avatar3DProps['bodyMeasurements']
  ) => {
    const scaleFactor = measurements ? measurements.height / 170 : 1;
    
    // Skin tone
    ctx.fillStyle = '#F4C2A8';
    ctx.strokeStyle = '#D4A086';
    ctx.lineWidth = 2;

    // Head
    ctx.beginPath();
    ctx.ellipse(0, -120 * scaleFactor, 30, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Neck
    ctx.beginPath();
    ctx.rect(-10, -85 * scaleFactor, 20, 20 * scaleFactor);
    ctx.fill();
    ctx.stroke();

    // Torso
    const bustWidth = measurements ? measurements.bust / 3 : 30;
    const waistWidth = measurements ? measurements.waist / 3 : 25;
    
    ctx.beginPath();
    ctx.moveTo(-bustWidth, -65 * scaleFactor);
    ctx.lineTo(-waistWidth, 0);
    ctx.lineTo(-measurements?.hips ? -35 : -30, 60 * scaleFactor);
    ctx.lineTo(measurements?.hips ? 35 : 30, 60 * scaleFactor);
    ctx.lineTo(waistWidth, 0);
    ctx.lineTo(bustWidth, -65 * scaleFactor);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Arms
    // Left arm
    ctx.beginPath();
    ctx.moveTo(-bustWidth, -60 * scaleFactor);
    ctx.lineTo(-bustWidth - 15, -20 * scaleFactor);
    ctx.lineTo(-bustWidth - 18, 30 * scaleFactor);
    ctx.lineTo(-bustWidth - 12, 30 * scaleFactor);
    ctx.lineTo(-bustWidth - 10, -20 * scaleFactor);
    ctx.lineTo(-bustWidth - 5, -60 * scaleFactor);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right arm
    ctx.beginPath();
    ctx.moveTo(bustWidth, -60 * scaleFactor);
    ctx.lineTo(bustWidth + 15, -20 * scaleFactor);
    ctx.lineTo(bustWidth + 18, 30 * scaleFactor);
    ctx.lineTo(bustWidth + 12, 30 * scaleFactor);
    ctx.lineTo(bustWidth + 10, -20 * scaleFactor);
    ctx.lineTo(bustWidth + 5, -60 * scaleFactor);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Legs
    const hipWidth = measurements?.hips ? measurements.hips / 3 : 30;
    
    // Left leg
    ctx.beginPath();
    ctx.rect(-hipWidth / 2 - 8, 60 * scaleFactor, 15, 80 * scaleFactor);
    ctx.fill();
    ctx.stroke();

    // Right leg
    ctx.beginPath();
    ctx.rect(hipWidth / 2 - 7, 60 * scaleFactor, 15, 80 * scaleFactor);
    ctx.fill();
    ctx.stroke();

    // Feet
    ctx.beginPath();
    ctx.ellipse(-hipWidth / 2 - 1, 140 * scaleFactor + 8, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(hipWidth / 2 + 7, 140 * scaleFactor + 8, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const drawOutfit = (
    ctx: CanvasRenderingContext2D,
    outfit: Avatar3DProps['selectedOutfit'],
    measurements?: Avatar3DProps['bodyMeasurements']
  ) => {
    const scaleFactor = measurements ? measurements.height / 170 : 1;
    const color = outfit?.color || '#E6B3CC';

    ctx.fillStyle = color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;

    // Draw dress
    if (outfit?.dress) {
      const bustWidth = measurements ? measurements.bust / 3 : 30;
      const waistWidth = measurements ? measurements.waist / 3 : 25;
      const hipWidth = measurements?.hips ? measurements.hips / 3 : 30;

      ctx.beginPath();
      ctx.moveTo(-bustWidth - 2, -65 * scaleFactor);
      ctx.lineTo(-waistWidth - 2, 0);
      ctx.lineTo(-hipWidth - 5, 60 * scaleFactor);
      ctx.lineTo(-hipWidth - 10, 100 * scaleFactor);
      ctx.lineTo(hipWidth + 10, 100 * scaleFactor);
      ctx.lineTo(hipWidth + 5, 60 * scaleFactor);
      ctx.lineTo(waistWidth + 2, 0);
      ctx.lineTo(bustWidth + 2, -65 * scaleFactor);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Add some details
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.moveTo(-waistWidth, 0);
      ctx.lineTo(waistWidth, 0);
      ctx.stroke();
    }

    // Draw top
    if (outfit?.top) {
      const bustWidth = measurements ? measurements.bust / 3 : 30;
      const waistWidth = measurements ? measurements.waist / 3 : 25;

      ctx.beginPath();
      ctx.moveTo(-bustWidth - 2, -65 * scaleFactor);
      ctx.lineTo(-waistWidth - 2, 5);
      ctx.lineTo(waistWidth + 2, 5);
      ctx.lineTo(bustWidth + 2, -65 * scaleFactor);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw bottom
    if (outfit?.bottom) {
      const waistWidth = measurements ? measurements.waist / 3 : 25;
      const hipWidth = measurements?.hips ? measurements.hips / 3 : 30;

      ctx.fillStyle = outfit.color || '#4A5568';
      
      // Left leg
      ctx.beginPath();
      ctx.rect(-hipWidth / 2 - 9, 5, 16, 135 * scaleFactor);
      ctx.fill();
      ctx.stroke();

      // Right leg
      ctx.beginPath();
      ctx.rect(hipWidth / 2 - 8, 5, 16, 135 * scaleFactor);
      ctx.fill();
      ctx.stroke();
    }
  };

  const handleRotateLeft = () => setRotation(rotation - 45);
  const handleRotateRight = () => setRotation(rotation + 45);
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));
  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={600}
        height={800}
        className="w-full h-full cursor-move"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (isDragging) {
            setPosition({
              x: position.x + e.movementX,
              y: position.y + e.movementY
            });
          }
        }}
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <Button size="sm" variant="outline" onClick={handleRotateLeft} title="Rotate Left">
          <RotateCw className="w-4 h-4 transform scale-x-[-1]" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleRotateRight} title="Rotate Right">
          <RotateCw className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleReset} title="Reset View">
          <Move className="w-4 h-4" />
        </Button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow px-3 py-1 text-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
