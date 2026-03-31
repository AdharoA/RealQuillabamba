import React from 'react';

export const OriginsScreen = () => {
  const origins = [
    { name: "Northern Province", desc: "High altitude, bright acidity.", image: "https://images.unsplash.com/photo-1524350876685-274059332603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Virunga Mountains", desc: "Volcanic soil, rich and earthy.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Lake Kivu", desc: "Mild microclimate, sweet and smooth.", image: "https://images.unsplash.com/photo-1544833058-2e061ff36053?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-foreground mb-6">Farms & Origins</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Discover the unique terroirs that shape every cup of our coffee.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {origins.map((origin, idx) => (
            <div key={idx} className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all">
              <img src={origin.image} alt={origin.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif text-white mb-2">{origin.name}</h3>
                <p className="text-white/80">{origin.desc}</p>
                <div className="mt-6">
                  <span className="inline-block border border-white text-white px-6 py-2 rounded-full uppercase tracking-widest text-[10px] font-bold group-hover:bg-white group-hover:text-black transition-colors">
                    Explore Region
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
