import { useState, useCallback } from 'react';
import { Plus, Image, Share } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { MoodBoard, Photo } from '@/components/mood-board/MoodBoard';
import { PhotoGallery, PhotoItem } from '@/components/mood-board/PhotoGallery';

// Sample images for demo
const samplePhotos: PhotoItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&q=80',
    caption: 'Beach sunset'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=500&q=80',
    caption: 'Mountain trail'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=500&q=80',
    caption: 'Desert view'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    caption: 'Tropical beach'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&q=80',
    caption: 'Ocean waves'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=500&q=80',
    caption: 'Autumn forest'
  }
];

export default function MoodBoardPage() {
  const [moodBoardTitle, setMoodBoardTitle] = useState('My Travel Mood Board');
  const [moodBoardDesc, setMoodBoardDesc] = useState('Inspiration for my next adventure');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle adding a photo from gallery
  const handleAddPhotoFromGallery = useCallback((photo: PhotoItem) => {
    const newPhoto: Photo = {
      id: uuidv4(),
      src: photo.src,
      caption: photo.caption,
      position: {
        // Random position in the center area of the board
        x: 200 + Math.random() * 400 - 200,
        y: 200 + Math.random() * 300 - 150
      },
      size: {
        width: 250,
        height: 200
      },
      zIndex: Date.now(),
      rotation: (Math.random() * 20 - 10) // Random slight rotation
    };
    
    setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
    setShowGallery(false);
  }, []);
  
  // Handle updating a photo (position, size, rotation)
  const handleUpdatePhoto = useCallback((updatedPhoto: Photo) => {
    setPhotos(prevPhotos => 
      prevPhotos.map(photo => 
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      )
    );
  }, []);
  
  // Handle deleting a photo
  const handleDeletePhoto = useCallback((id: string) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
  }, []);
  
  // Handle saving the mood board
  const handleSave = useCallback((savedPhotos: Photo[]) => {
    setIsSaving(true);
    
    // Simulate API call to save
    setTimeout(() => {
      console.log('Saved mood board:', {
        title: moodBoardTitle,
        description: moodBoardDesc,
        photos: savedPhotos
      });
      setIsSaving(false);
      
      // Show success message
      alert('Mood board saved successfully!');
    }, 1000);
  }, [moodBoardTitle, moodBoardDesc]);
  
  // Handle share functionality
  const handleShare = useCallback(() => {
    // In a real application, this would generate a shareable link
    alert('Shareable link generated! (Demo only)');
  }, []);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold">{moodBoardTitle}</h1>
          <p className="text-sm text-gray-500">{moodBoardDesc}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1.5 text-sm"
            onClick={() => setShowGallery(true)}
          >
            <Image className="h-4 w-4" />
            <span>Add Photos</span>
          </button>
          
          <button
            type="button"
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1.5 text-sm"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </button>
          
          <button
            type="button"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-1.5 text-sm"
            onClick={() => handleSave(photos)}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>
      
      {/* Main board area */}
      <div className="flex-1 relative overflow-hidden">
        <MoodBoard
          title={moodBoardTitle}
          description={moodBoardDesc}
          photos={photos}
          onUpdatePhoto={handleUpdatePhoto}
          onDeletePhoto={handleDeletePhoto}
          onSave={handleSave}
        />
        
        {/* Empty state */}
        {photos.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your mood board is empty</h3>
              <p className="text-gray-600 mb-4">
                Add some photos to start creating your travel inspiration board.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => setShowGallery(true)}
              >
                Add Photos
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Photo gallery modal */}
      {showGallery && (
        <PhotoGallery
          photos={samplePhotos}
          onSelectPhoto={handleAddPhotoFromGallery}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}