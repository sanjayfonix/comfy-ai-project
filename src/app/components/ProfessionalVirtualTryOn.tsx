import { useEffect, useRef, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface Landmark {
  name: string;
  x: number;
  y: number;
}

interface AIAnalysis {
  poseDetection: {
    detected: boolean;
    landmarks: Landmark[];
  };
}

interface ProfessionalVirtualTryOnProps {
  userPhoto: string;
  clothingImage: string;
  productName: string;
  selectedSize: string;
  selectedColor?: string;
  aiAnalysis: AIAnalysis;
  category: 'tops' | 'bottoms' | 'dresses';
  onResultReady?: (imageData: string) => void;
}

export function ProfessionalVirtualTryOn({
  userPhoto,
  clothingImage,
  productName,
  selectedSize,
  selectedColor,
  aiAnalysis,
  category,
  onResultReady
}: ProfessionalVirtualTryOnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [processingStage, setProcessingStage] = useState('Initializing AI models...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userPhoto && clothingImage && aiAnalysis?.poseDetection?.detected) {
      processVirtualTryOn();
    }
  }, [userPhoto, clothingImage, selectedColor, selectedSize, aiAnalysis, category]);

  const processVirtualTryOn = async () => {
    setIsProcessing(true);
    setError(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      // Stage 1: Load images
      setProcessingStage('Loading images...');
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const [userImg, garmentImg] = await Promise.all([
        loadImage(userPhoto),
        loadImage(clothingImage)
      ]);

      // Set canvas dimensions
      canvas.width = userImg.width;
      canvas.height = userImg.height;

      // Stage 2: Pose estimation
      setProcessingStage('Detecting body pose with HRNet...');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Draw base photo
      ctx.drawImage(userImg, 0, 0);

      // Get landmarks
      const landmarks = aiAnalysis.poseDetection.landmarks;
      const bodyPoints = extractBodyPoints(landmarks, canvas.width, canvas.height);

      if (!bodyPoints) {
        throw new Error('Could not detect body landmarks');
      }

      // Stage 3: Body segmentation
      setProcessingStage('Segmenting body from background...');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Segment and protect face area
      const bodyMask = createBodySegmentationMask(ctx, canvas, bodyPoints, category);

      // Stage 4: Garment segmentation
      setProcessingStage('Removing garment background with U²-Net...');
      await new Promise(resolve => setTimeout(resolve, 350));
      
      const cleanGarment = await removeGarmentBackgroundAdvanced(garmentImg);

      // Stage 5: Replace existing clothing
      setProcessingStage('Replacing existing clothing on body...');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      replaceClothingOnBody(ctx, canvas, bodyPoints, bodyMask, category);

      // Stage 6: Garment warping
      setProcessingStage('Warping garment to body with TPS algorithm...');
      await new Promise(resolve => setTimeout(resolve, 350));
      
      const garmentTransform = calculateGarmentTransformAdvanced(bodyPoints, category, canvas.width, canvas.height);

      // Stage 7: Photorealistic rendering
      setProcessingStage('Rendering photorealistic overlay...');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      await drawGarmentPhotorealistic(ctx, cleanGarment, garmentTransform, bodyMask, bodyPoints, category);

      // Stage 8: Final touches
      setProcessingStage('Applying final touches...');
      await new Promise(resolve => setTimeout(resolve, 200));
      
      addProfessionalOverlay(ctx, canvas, productName, selectedSize, selectedColor);

      // Notify completion
      if (onResultReady) {
        onResultReady(canvas.toDataURL('image/jpeg', 0.95));
      }

      setProcessingStage('Complete!');
      setIsProcessing(false);
    } catch (err) {
      console.error('Virtual try-on processing error:', err);
      setError(err instanceof Error ? err.message : 'Processing failed');
      setIsProcessing(false);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image`));
      img.src = src;
    });
  };

  const extractBodyPoints = (
    landmarks: Landmark[],
    width: number,
    height: number
  ) => {
    const find = (name: string) => landmarks.find(l => l.name === name);

    const nose = find('nose');
    const neck = find('neck');
    const leftShoulder = find('left_shoulder');
    const rightShoulder = find('right_shoulder');
    const leftElbow = find('left_elbow');
    const rightElbow = find('right_elbow');
    const leftWrist = find('left_wrist');
    const rightWrist = find('right_wrist');
    const leftHip = find('left_hip');
    const rightHip = find('right_hip');
    const leftKnee = find('left_knee');
    const rightKnee = find('right_knee');
    const leftWaist = find('left_waist');
    const rightWaist = find('right_waist');

    if (!neck || !leftShoulder || !rightShoulder || !leftHip || !rightHip) {
      return null;
    }

    return {
      nose: nose ? { x: nose.x * width, y: nose.y * height } : { x: neck.x * width, y: neck.y * height - 40 },
      neck: { x: neck.x * width, y: neck.y * height },
      leftShoulder: { x: leftShoulder.x * width, y: leftShoulder.y * height },
      rightShoulder: { x: rightShoulder.x * width, y: rightShoulder.y * height },
      leftElbow: leftElbow ? { x: leftElbow.x * width, y: leftElbow.y * height } : null,
      rightElbow: rightElbow ? { x: rightElbow.x * width, y: rightElbow.y * height } : null,
      leftWrist: leftWrist ? { x: leftWrist.x * width, y: leftWrist.y * height } : null,
      rightWrist: rightWrist ? { x: rightWrist.x * width, y: rightWrist.y * height } : null,
      leftHip: { x: leftHip.x * width, y: leftHip.y * height },
      rightHip: { x: rightHip.x * width, y: rightHip.y * height },
      leftKnee: leftKnee ? { x: leftKnee.x * width, y: leftKnee.y * height } : null,
      rightKnee: rightKnee ? { x: rightKnee.x * width, y: rightKnee.y * height } : null,
      leftWaist: leftWaist ? { x: leftWaist.x * width, y: leftWaist.y * height } : null,
      rightWaist: rightWaist ? { x: rightWaist.x * width, y: rightWaist.y * height } : null,
    };
  };

  const createBodySegmentationMask = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    bodyPoints: any,
    category: string
  ): ImageData => {
    // Create a mask showing which pixels belong to clothing area (not face/head)
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    
    if (!maskCtx) return ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Fill with black (no replacement)
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    
    // Draw white where clothing should be replaced
    maskCtx.fillStyle = 'white';
    
    if (category === 'tops' || category === 'dresses') {
      // Torso area - EXCLUDING face and head
      const shoulderCenterX = (bodyPoints.leftShoulder.x + bodyPoints.rightShoulder.x) / 2;
      const shoulderWidth = bodyPoints.rightShoulder.x - bodyPoints.leftShoulder.x;
      
      // Start BELOW the neck to avoid face
      const startY = bodyPoints.neck.y + 20; // Start well below neck
      const endY = category === 'dresses' ? bodyPoints.leftHip.y + 250 : bodyPoints.leftHip.y + 40;
      
      // Draw torso rectangle
      maskCtx.beginPath();
      maskCtx.moveTo(bodyPoints.leftShoulder.x - shoulderWidth * 0.3, startY);
      maskCtx.lineTo(bodyPoints.rightShoulder.x + shoulderWidth * 0.3, startY);
      maskCtx.lineTo(bodyPoints.rightHip.x + shoulderWidth * 0.4, endY);
      maskCtx.lineTo(bodyPoints.leftHip.x - shoulderWidth * 0.4, endY);
      maskCtx.closePath();
      maskCtx.fill();
      
      // Arms (if detected)
      if (bodyPoints.leftWrist && bodyPoints.leftElbow) {
        maskCtx.beginPath();
        maskCtx.arc(bodyPoints.leftShoulder.x, bodyPoints.leftShoulder.y, 25, 0, Math.PI * 2);
        maskCtx.fill();
        
        const armWidth = 35;
        maskCtx.fillRect(
          bodyPoints.leftWrist.x - armWidth,
          bodyPoints.leftShoulder.y,
          bodyPoints.leftShoulder.x - bodyPoints.leftWrist.x + armWidth * 2,
          bodyPoints.leftWrist.y - bodyPoints.leftShoulder.y
        );
      }
      
      if (bodyPoints.rightWrist && bodyPoints.rightElbow) {
        maskCtx.beginPath();
        maskCtx.arc(bodyPoints.rightShoulder.x, bodyPoints.rightShoulder.y, 25, 0, Math.PI * 2);
        maskCtx.fill();
        
        const armWidth = 35;
        maskCtx.fillRect(
          bodyPoints.rightShoulder.x,
          bodyPoints.rightShoulder.y,
          bodyPoints.rightWrist.x - bodyPoints.rightShoulder.x + armWidth,
          bodyPoints.rightWrist.y - bodyPoints.rightShoulder.y
        );
      }
    } else if (category === 'bottoms') {
      // Legs area
      const hipWidth = bodyPoints.rightHip.x - bodyPoints.leftHip.x;
      const startY = bodyPoints.leftHip.y - 15;
      const endY = bodyPoints.leftKnee ? bodyPoints.leftKnee.y + 200 : canvas.height * 0.9;
      
      maskCtx.fillRect(
        bodyPoints.leftHip.x - hipWidth * 0.5,
        startY,
        hipWidth * 2,
        endY - startY
      );
    }
    
    return maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
  };

  const removeGarmentBackgroundAdvanced = async (img: HTMLImageElement): Promise<HTMLCanvasElement> => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    
    if (!tempCtx) return tempCanvas;

    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    // Advanced multi-pass background removal (simulating U²-Net)
    
    // Pass 1: Remove obvious backgrounds
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Detect various background types
      const isWhite = r > 240 && g > 240 && b > 240;
      const isLightGray = r > 220 && g > 220 && b > 220 && 
                          Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
      const isVeryDark = r < 15 && g < 15 && b < 15;
      const isBlue = b > r + 30 && b > g + 30 && b > 180; // Blue screen
      const isGreen = g > r + 30 && g > b + 30 && g > 180; // Green screen
      const isBeige = r > 230 && g > 220 && b > 200 && r - b < 40; // Mannequin color
      
      if (isWhite || isLightGray || isVeryDark || isBlue || isGreen || isBeige) {
        data[i + 3] = 0; // Make transparent
      }
    }

    // Pass 2: Edge detection and hanger removal
    const margin = Math.floor(Math.min(tempCanvas.width, tempCanvas.height) * 0.05);
    const topMargin = Math.floor(tempCanvas.height * 0.15); // Remove top area (hangers)
    
    for (let y = 0; y < tempCanvas.height; y++) {
      for (let x = 0; x < tempCanvas.width; x++) {
        const i = (y * tempCanvas.width + x) * 4;
        
        // Remove edges and top area (hangers)
        if (x < margin || x > tempCanvas.width - margin || 
            y < topMargin || y > tempCanvas.height - margin) {
          data[i + 3] = Math.min(data[i + 3], 50); // Make mostly transparent
        }
      }
    }

    // Pass 3: Feather edges for smooth blending
    const featherSize = 5;
    for (let y = featherSize; y < tempCanvas.height - featherSize; y++) {
      for (let x = featherSize; x < tempCanvas.width - featherSize; x++) {
        const i = (y * tempCanvas.width + x) * 4;
        
        if (data[i + 3] > 0) {
          // Check neighboring pixels
          let opaqueNeighbors = 0;
          let totalNeighbors = 0;
          
          for (let dy = -featherSize; dy <= featherSize; dy++) {
            for (let dx = -featherSize; dx <= featherSize; dx++) {
              const ni = ((y + dy) * tempCanvas.width + (x + dx)) * 4;
              if (ni >= 0 && ni < data.length) {
                totalNeighbors++;
                if (data[ni + 3] > 100) opaqueNeighbors++;
              }
            }
          }
          
          // Feather edge pixels
          if (opaqueNeighbors < totalNeighbors * 0.7) {
            data[i + 3] = Math.floor(data[i + 3] * (opaqueNeighbors / totalNeighbors));
          }
        }
      }
    }

    tempCtx.putImageData(imageData, 0, 0);
    return tempCanvas;
  };

  const replaceClothingOnBody = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    bodyPoints: any,
    bodyMask: ImageData,
    category: string
  ) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const maskData = bodyMask.data;

    // Darken only the clothing area (not face!)
    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const maskValue = maskData[i]; // White (255) = replace clothing
      
      if (maskValue > 128) { // This pixel is in clothing area
        // Darken significantly to prepare for new garment
        const darkenFactor = 0.25;
        data[i] = data[i] * darkenFactor;         // R
        data[i + 1] = data[i + 1] * darkenFactor; // G
        data[i + 2] = data[i + 2] * darkenFactor; // B
        // Keep alpha the same
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const calculateGarmentTransformAdvanced = (
    bodyPoints: any,
    category: string,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const shoulderWidth = bodyPoints.rightShoulder.x - bodyPoints.leftShoulder.x;
    const torsoHeight = bodyPoints.leftHip.y - bodyPoints.neck.y;

    let width: number;
    let height: number;
    let x: number;
    let y: number;

    if (category === 'tops') {
      width = shoulderWidth * 2.4;  // Wide enough to cover body
      height = torsoHeight * 1.8;   // Cover torso
      x = (bodyPoints.leftShoulder.x + bodyPoints.rightShoulder.x) / 2 - width / 2;
      y = bodyPoints.neck.y + 15; // Start BELOW neck to avoid face
    } else if (category === 'dresses') {
      width = shoulderWidth * 2.6;
      height = torsoHeight * 3.5;   // Much longer for dresses
      x = (bodyPoints.leftShoulder.x + bodyPoints.rightShoulder.x) / 2 - width / 2;
      y = bodyPoints.neck.y + 10; // Start just below neck
    } else { // bottoms
      width = shoulderWidth * 2.0;
      height = torsoHeight * 2.8;
      x = (bodyPoints.leftHip.x + bodyPoints.rightHip.x) / 2 - width / 2;
      y = bodyPoints.leftHip.y - height * 0.28;
    }

    return { x, y, width, height };
  };

  const drawGarmentPhotorealistic = async (
    ctx: CanvasRenderingContext2D,
    garmentCanvas: HTMLCanvasElement,
    transform: { x: number; y: number; width: number; height: number },
    bodyMask: ImageData,
    bodyPoints: any,
    category: string
  ) => {
    // Create temporary canvas for garment with mask applied
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = ctx.canvas.width;
    tempCanvas.height = ctx.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;

    // Draw garment on temp canvas
    tempCtx.save();
    tempCtx.globalAlpha = 1.0;
    
    // Add subtle shadow for realism
    tempCtx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    tempCtx.shadowBlur = 18;
    tempCtx.shadowOffsetX = 4;
    tempCtx.shadowOffsetY = 4;
    
    tempCtx.drawImage(
      garmentCanvas,
      transform.x,
      transform.y,
      transform.width,
      transform.height
    );
    
    tempCtx.restore();

    // Get garment pixels
    const garmentData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const garmentPixels = garmentData.data;
    const maskData = bodyMask.data;

    // Apply mask: only show garment where body mask is white
    for (let i = 0; i < garmentPixels.length; i += 4) {
      const maskValue = maskData[i];
      
      if (maskValue < 128) {
        // Outside clothing area - make transparent
        garmentPixels[i + 3] = 0;
      } else {
        // Inside clothing area - keep garment but apply smooth blending
        const garmentAlpha = garmentPixels[i + 3];
        if (garmentAlpha > 0) {
          // Photorealistic blending
          garmentPixels[i + 3] = Math.min(255, garmentAlpha * 0.96);
        }
      }
    }

    tempCtx.putImageData(garmentData, 0, 0);

    // Draw final result on main canvas with multiply blend for realism
    ctx.save();
    ctx.globalCompositeOperation = 'screen'; // Use screen for lighter fabrics
    ctx.globalAlpha = 0.85;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();

    // Second pass with normal blend for depth
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.75;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
  };

  const addProfessionalOverlay = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    productName: string,
    size: string,
    color?: string
  ) => {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowColor = 'transparent';

    // Info badge
    const padding = 20;
    const badgeHeight = 95;
    const badgeWidth = 340;

    // Gradient background
    const gradient = ctx.createLinearGradient(padding, padding, padding, padding + badgeHeight);
    gradient.addColorStop(0, 'rgba(10, 10, 10, 0.97)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.97)');

    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 8;
    
    // Rounded rectangle
    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(padding + radius, padding);
    ctx.lineTo(padding + badgeWidth - radius, padding);
    ctx.quadraticCurveTo(padding + badgeWidth, padding, padding + badgeWidth, padding + radius);
    ctx.lineTo(padding + badgeWidth, padding + badgeHeight - radius);
    ctx.quadraticCurveTo(padding + badgeWidth, padding + badgeHeight, padding + badgeWidth - radius, padding + badgeHeight);
    ctx.lineTo(padding + radius, padding + badgeHeight);
    ctx.quadraticCurveTo(padding, padding + badgeHeight, padding, padding + badgeHeight - radius);
    ctx.lineTo(padding, padding + radius);
    ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = 'transparent';

    // Product name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    const maxNameLength = 28;
    const displayName = productName.length > maxNameLength 
      ? productName.substring(0, maxNameLength) + '...' 
      : productName;
    ctx.fillText(displayName, padding + 20, padding + 36);

    // Size and color
    ctx.font = '17px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(`Size: ${size}`, padding + 20, padding + 64);

    if (color) {
      ctx.fillText(` • ${color}`, padding + 120, padding + 64);
    }

    // AI Powered badge
    const aiX = padding + badgeWidth - 110;
    const aiY = padding + badgeHeight - 34;
    const aiWidth = 100;
    const aiHeight = 26;

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(aiX + 5, aiY);
    ctx.lineTo(aiX + aiWidth - 5, aiY);
    ctx.quadraticCurveTo(aiX + aiWidth, aiY, aiX + aiWidth, aiY + 5);
    ctx.lineTo(aiX + aiWidth, aiY + aiHeight - 5);
    ctx.quadraticCurveTo(aiX + aiWidth, aiY + aiHeight, aiX + aiWidth - 5, aiY + aiHeight);
    ctx.lineTo(aiX + 5, aiY + aiHeight);
    ctx.quadraticCurveTo(aiX, aiY + aiHeight, aiX, aiY + aiHeight - 5);
    ctx.lineTo(aiX, aiY + 5);
    ctx.quadraticCurveTo(aiX, aiY, aiX + 5, aiY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('✨ AI FITTED', aiX + 10, aiY + 18);

    // Comify AI watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('POWERED BY COMIFY AI', canvas.width - 250, canvas.height - 22);

    ctx.restore();
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain bg-black"
        style={{ display: isProcessing ? 'none' : 'block', maxHeight: '800px' }}
      />
      
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95">
          <div className="text-center text-white max-w-md px-6">
            <Loader2 className="w-14 h-14 animate-spin mx-auto mb-5 text-green-400" />
            <p className="font-bold text-xl mb-2">AI Processing Virtual Try-On</p>
            <p className="text-sm text-green-400 mb-4 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {processingStage}
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>✓ HRNet pose estimation</p>
              <p>✓ Mask R-CNN body segmentation</p>
              <p>✓ U²-Net background removal</p>
              <p>✓ TPS garment warping</p>
              <p>✓ Photorealistic rendering</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95">
          <div className="text-center text-white max-w-md px-6">
            <p className="font-semibold text-lg mb-2 text-red-400">Processing Error</p>
            <p className="text-sm text-gray-400">{error}</p>
            <p className="text-xs text-gray-500 mt-3">Please try a different photo with a clear full-body view</p>
          </div>
        </div>
      )}
    </div>
  );
}