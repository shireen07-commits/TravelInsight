import { useState } from 'react';
import { X, Search } from 'lucide-react';

export interface PhotoItem {
  id: string;
  src: string;
  caption?: string;
}

export interface PhotoGalleryProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onClose: () => void;
}

export function PhotoGallery({ photos, onSelectPhoto, onClose }: PhotoGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter photos based on search
  const filteredPhotos = searchQuery.trim() === '' 
    ? photos 
    : photos.filter(photo => 
        photo.caption?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Photo Gallery</h2>
          <button 
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by caption..."
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="relative group cursor-pointer rounded-md overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md"
                onClick={() => onSelectPhoto(photo)}
              >
                <img 
                  src={photo.src}
                  alt={photo.caption || 'Photo'}
                  className="w-full h-36 object-cover"
                />
                {photo.caption && (
                  <div className="p-2 bg-white text-sm truncate">
                    {photo.caption}
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No photos found matching your search.
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} available
          </span>
          <button 
            type="button"
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}