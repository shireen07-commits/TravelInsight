import { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { PhotoCard } from './PhotoCard';

export interface Photo {
  id: string;
  src: string;
  caption?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  rotation: number;
}

export interface MoodBoardProps {
  title?: string;
  description?: string;
  photos: Photo[];
  onAddPhoto?: (photo: Photo) => void;
  onUpdatePhoto?: (photo: Photo) => void;
  onDeletePhoto?: (id: string) => void;
  onSave?: (photos: Photo[]) => void;
  readOnly?: boolean;
}

export function MoodBoard({
  title,
  description,
  photos = [],
  onAddPhoto,
  onUpdatePhoto,
  onDeletePhoto,
  onSave,
  readOnly = false,
}: MoodBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>(photos);

  // Update local photos when prop changes
  useEffect(() => {
    setLocalPhotos(photos);
  }, [photos]);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px of movement required before activation
      },
    })
  );

  // Handle drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta } = event;
      const photoId = active.id as string;

      // Find the photo that was dragged
      const photoIndex = localPhotos.findIndex((p) => p.id === photoId);
      if (photoIndex === -1) return;

      const photo = localPhotos[photoIndex];

      // Update its position
      const updatedPhoto = {
        ...photo,
        position: {
          x: photo.position.x + delta.x,
          y: photo.position.y + delta.y,
        },
      };

      // Update local state
      const newPhotos = [...localPhotos];
      newPhotos[photoIndex] = updatedPhoto;
      setLocalPhotos(newPhotos);

      // Notify parent
      if (onUpdatePhoto) {
        onUpdatePhoto(updatedPhoto);
      }

      setActiveId(null);
    },
    [localPhotos, onUpdatePhoto]
  );

  // Handler for photo movement
  const handlePhotoMove = useCallback(
    (id: string, position: { x: number; y: number }) => {
      const photoIndex = localPhotos.findIndex((p) => p.id === id);
      if (photoIndex === -1) return;

      const updatedPhoto = {
        ...localPhotos[photoIndex],
        position,
      };

      // Update local state
      const newPhotos = [...localPhotos];
      newPhotos[photoIndex] = updatedPhoto;
      setLocalPhotos(newPhotos);

      // Notify parent
      if (onUpdatePhoto) {
        onUpdatePhoto(updatedPhoto);
      }
    },
    [localPhotos, onUpdatePhoto]
  );

  // Handler for photo resize
  const handlePhotoResize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      const photoIndex = localPhotos.findIndex((p) => p.id === id);
      if (photoIndex === -1) return;

      const updatedPhoto = {
        ...localPhotos[photoIndex],
        size,
      };

      // Update local state
      const newPhotos = [...localPhotos];
      newPhotos[photoIndex] = updatedPhoto;
      setLocalPhotos(newPhotos);

      // Notify parent
      if (onUpdatePhoto) {
        onUpdatePhoto(updatedPhoto);
      }
    },
    [localPhotos, onUpdatePhoto]
  );

  // Handler for photo rotation
  const handlePhotoRotate = useCallback(
    (id: string, rotation: number) => {
      const photoIndex = localPhotos.findIndex((p) => p.id === id);
      if (photoIndex === -1) return;

      const updatedPhoto = {
        ...localPhotos[photoIndex],
        rotation,
      };

      // Update local state
      const newPhotos = [...localPhotos];
      newPhotos[photoIndex] = updatedPhoto;
      setLocalPhotos(newPhotos);

      // Notify parent
      if (onUpdatePhoto) {
        onUpdatePhoto(updatedPhoto);
      }
    },
    [localPhotos, onUpdatePhoto]
  );

  // Handler for photo deletion
  const handlePhotoDelete = useCallback(
    (id: string) => {
      // Remove from local state
      const newPhotos = localPhotos.filter((p) => p.id !== id);
      setLocalPhotos(newPhotos);

      // Notify parent
      if (onDeletePhoto) {
        onDeletePhoto(id);
      }
    },
    [localPhotos, onDeletePhoto]
  );

  // Get active photo for drag overlay
  const activePhoto = activeId ? localPhotos.find((p) => p.id === activeId) : null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-50">
      {/* Title and description */}
      {(title || description) && (
        <div className="absolute top-4 left-4 z-10 bg-white/80 p-4 rounded-lg shadow-sm max-w-xs">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}

      {/* Main board area */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)' }}
        >
          {/* Photos */}
          {localPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              src={photo.src}
              caption={photo.caption}
              initialPosition={photo.position}
              initialSize={photo.size}
              initialZIndex={photo.zIndex}
              initialRotation={photo.rotation}
              onMove={!readOnly ? handlePhotoMove : undefined}
              onResize={!readOnly ? handlePhotoResize : undefined}
              onRotate={!readOnly ? handlePhotoRotate : undefined}
              onDelete={!readOnly ? handlePhotoDelete : undefined}
            />
          ))}

          {/* Drag overlay */}
          <DragOverlay>
            {activeId && activePhoto && (
              <div className="opacity-80">
                <PhotoCard
                  id={activePhoto.id}
                  src={activePhoto.src}
                  caption={activePhoto.caption}
                  initialPosition={{ x: 0, y: 0 }} // Position is handled by DragOverlay
                  initialSize={activePhoto.size}
                  initialZIndex={999}
                  initialRotation={activePhoto.rotation}
                />
              </div>
            )}
          </DragOverlay>
        </div>
      </DndContext>

      {/* Save button */}
      {!readOnly && onSave && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => onSave(localPhotos)}
          >
            Save Mood Board
          </button>
        </div>
      )}
    </div>
  );
}