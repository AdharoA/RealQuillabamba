import React from 'react';

export const BrandsScreen = () => {
  const brands = [
    { name: "Maison Margiela", desc: "Vanguardia y deconstrucción parisina.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Céline", desc: "Minimalismo contemporáneo y elegancia absoluta.", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Bottega Veneta", desc: "Artesanía italiana en cuero y siluetas modernas.", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-accent mb-6 text-foreground">Marcas Exclusivas</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Colaboramos con las casas de moda más prestigiosas del mundo para traerte selecciones únicas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, idx) => (
            <div key={idx} className="group relative h-[500px] rounded-sm overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all">
              <img src={brand.image} alt={brand.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-accent text-white mb-2">{brand.name}</h3>
                <p className="text-white/80">{brand.desc}</p>
                <div className="mt-6">
                  <span className="inline-block border border-white text-white px-6 py-2 uppercase tracking-widest text-[10px] font-bold group-hover:bg-white group-hover:text-black transition-colors">
                    Ver Colección
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
