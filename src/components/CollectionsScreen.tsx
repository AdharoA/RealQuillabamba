import React from 'react';

export const CollectionsScreen = () => {
  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-foreground mb-6">Curated Collections</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Discover our seasonal highlights and beautifully curated selections.</p>
        </div>
        
        <div className="mb-16 relative h-[600px] rounded-[40px] overflow-hidden flex items-center justify-center group shadow-md hover:shadow-2xl transition-shadow cursor-pointer">
             <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Morning Ritual" />
             <div className="absolute inset-0 bg-black/40"></div>
             <div className="relative z-10 text-center">
                 <h2 className="text-5xl lg:text-7xl font-serif text-white mb-4">The Morning Ritual</h2>
                 <p className="text-white/90 text-lg lg:text-xl mb-8">Start your day finding clarity through coffee.</p>
                 <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-colors">Explore Collection</button>
             </div>
        </div>
      </div>
    </div>
  );
};
