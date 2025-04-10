import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { X, RotateCcw, Maximize2 } from 'lucide-react';

export interface PhotoCardProps {
  id: string;
  src: string;
  caption?: string;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  initialZIndex?: number;
  initialRotation?: number;
  onMove?: (id: string, position: { x: number; y: number }) => void;
  onResize?: (id: string, size: { width: number; height: number }) => void;
  onRotate?: (id: string, rotation: number) => void;
  onDelete?: (id: string) => void;
}

export function PhotoCard({
  id,
  src,
  caption,
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 200, height: 150 },
  initialZIndex = 1,
  initialRotation = 0,
  onMove,
  onResize,
  onRotate,
  onDelete
}: PhotoCardProps) {
  // Set up draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  
  // Local state for position, size, and rotation
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [zIndex, setZIndex] = useState(initialZIndex);
  const [rotation, setRotation] = useState(initialRotation);
  const [isHovered, setIsHovered] = useState(false);
  
  // Refs for resize and rotate operations
  const [cardElement, setCardElement] = useState<HTMLDivElement | null>(null);
  const isResizing = useRef(false);
  const isRotating = useRef(false);
  const startResizePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startResizeSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const startRotateAngle = useRef(0);
  const startRotateValue = useRef(0);
  
  // Update position when transform changes from dragging
  useEffect(() => {
    if (transform && onMove) {
      const newPosition = {
        x: position.x + transform.x,
        y: position.y + transform.y
      };
      onMove(id, newPosition);
    }
  }, [transform, id, position, onMove]);
  
  // Handle bring to front on click
  const handleClick = () => {
    setZIndex(Date.now()); // Use timestamp as high z-index
  };
  
  // Handle mouse enter/leave for hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Handle delete
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };
  
  // Handle resize start
  const handleResizeStart = (e: ReactMouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    
    startResizePos.current = {
      x: e.clientX,
      y: e.clientY
    };
    
    startResizeSize.current = {
      width: size.width,
      height: size.height
    };
    
    const handleResizeMoveDoc = (moveEvent: globalThis.MouseEvent) => {
      handleResizeMove(moveEvent);
    };
    
    document.addEventListener('mousemove', handleResizeMoveDoc);
    document.addEventListener('mouseup', handleResizeEnd);
  };
  
  // Handle resize move
  const handleResizeMove = (moveEvent: globalThis.MouseEvent) => {
    if (!isResizing.current) return;
    
    const deltaX = moveEvent.clientX - startResizePos.current.x;
    const deltaY = moveEvent.clientY - startResizePos.current.y;
    
    // Maintain aspect ratio
    const aspectRatio = startResizeSize.current.width / startResizeSize.current.height;
    let newWidth = startResizeSize.current.width + deltaX;
    let newHeight = startResizeSize.current.height + deltaY;
    
    // Minimum size
    newWidth = Math.max(100, newWidth);
    newHeight = Math.max(75, newHeight);
    
    // Update size
    setSize({
      width: newWidth,
      height: newHeight
    });
  };
  
  // Handle resize end
  const handleResizeEnd = () => {
    if (isResizing.current && onResize) {
      onResize(id, size);
    }
    
    isResizing.current = false;
    
    const handleResizeMoveDoc = (moveEvent: globalThis.MouseEvent) => {
      handleResizeMove(moveEvent);
    };
    
    document.removeEventListener('mousemove', handleResizeMoveDoc);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
  
  // Handle rotate start
  const handleRotateStart = (e: ReactMouseEvent) => {
    e.stopPropagation();
    isRotating.current = true;
    
    // Card center
    const rect = cardElement?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate initial angle
    startRotateAngle.current = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    ) * (180 / Math.PI);
    
    startRotateValue.current = rotation;
    
    const handleRotateMoveDoc = (moveEvent: globalThis.MouseEvent) => {
      handleRotateMove(moveEvent);
    };
    
    document.addEventListener('mousemove', handleRotateMoveDoc);
    document.addEventListener('mouseup', handleRotateEnd);
  };
  
  // Handle rotate move
  const handleRotateMove = (moveEvent: globalThis.MouseEvent) => {
    if (!isRotating.current) return;
    
    const rect = cardElement?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate current angle
    const currentAngle = Math.atan2(
      moveEvent.clientY - centerY,
      moveEvent.clientX - centerX
    ) * (180 / Math.PI);
    
    // Calculate rotation change
    const angleDelta = currentAngle - startRotateAngle.current;
    let newRotation = startRotateValue.current + angleDelta;
    
    // Normalize to -180 to 180 degrees
    newRotation = ((newRotation + 180) % 360) - 180;
    
    // Update rotation
    setRotation(newRotation);
  };
  
  // Handle rotate end
  const handleRotateEnd = () => {
    if (isRotating.current && onRotate) {
      onRotate(id, rotation);
    }
    
    isRotating.current = false;
    
    const handleRotateMoveDoc = (moveEvent: globalThis.MouseEvent) => {
      handleRotateMove(moveEvent);
    };
    
    document.removeEventListener('mousemove', handleRotateMoveDoc);
    document.removeEventListener('mouseup', handleRotateEnd);
  };
  
  // Calculate styles including transform based on position and rotation
  const style = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: CSS.Translate.toString(transform) 
      ? `${CSS.Translate.toString(transform)} rotate(${rotation}deg)`
      : `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
    zIndex: zIndex,
    position: 'absolute' as const,
    transformOrigin: 'center',
    transition: transform ? undefined : 'box-shadow 0.2s ease',
  };
  
  // Create refs handler
  const handleCardRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    if (node instanceof HTMLDivElement) {
      // Update the state variable
      setCardElement(node);
    }
  };

  return (
    <div
      ref={handleCardRef}
      style={style}
      className="group bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden cursor-move"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...attributes}
      {...listeners}
    >
      {/* Controls overlay (visible on hover) */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/20 flex justify-between p-2 z-10">
          <div>
            {/* Rotate handle */}
            <button
              type="button"
              className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white"
              onMouseDown={(e: ReactMouseEvent) => handleRotateStart(e)}
              onClick={(e) => e.stopPropagation()}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          
          <div>
            {/* Delete button */}
            <button
              type="button"
              className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-red-500 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Photo */}
      <div className="h-full w-full relative">
        <img 
          src={src} 
          alt={caption || 'Photo'} 
          className="h-full w-full object-cover" 
        />
        
        {/* Caption */}
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm truncate">
            {caption}
          </div>
        )}
      </div>
      
      {/* Resize handle (visible on hover) */}
      {isHovered && (
        <div
          className="absolute bottom-1 right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center cursor-se-resize z-20"
          onMouseDown={(e: ReactMouseEvent) => handleResizeStart(e)}
          onClick={(e) => e.stopPropagation()}
        >
          <Maximize2 className="h-4 w-4 text-gray-700" />
        </div>
      )}
    </div>
  );
}