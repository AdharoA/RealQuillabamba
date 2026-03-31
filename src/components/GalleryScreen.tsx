import React from 'react';

export const GalleryScreen = () => {
  const photos = [
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-foreground mb-6">Journal & Gallery</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Vignettes of our craft, our culture, and our daily brew.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((src, i) => (
            <div key={i} className={`rounded-3xl overflow-hidden ${i === 0 || i === 3 ? 'md:h-[600px]' : 'md:h-[400px]'} h-[400px]`}>
              <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery item" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
