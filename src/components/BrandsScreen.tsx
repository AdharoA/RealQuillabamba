import React, { useState, useEffect } from 'react';
import { Tag, ArrowRight } from 'lucide-react';

export const BrandsScreen = ({ onBrandSelect }) => {
  const [brands, setBrands] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('http://localhost/RealQuillabamba/api/brands.php')
      .then(res => res.json())
      .then(data => { if(!data.error) setBrands(data); });
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-accent mb-6 text-foreground">Marcas y Fabricantes</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Colaboramos con las marcas más prestigiosas para asegurar la calidad de cada producto en nuestro catálogo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, idx) => (
            <div key={idx} onClick={() => onBrandSelect && onBrandSelect(brand.name)} className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95" style={{ animationDelay: `${idx * 150}ms` }}>
              {brand.image_url ? (
                  <img src={brand.image_url} alt={brand.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                     <Tag className="h-20 w-20 text-muted-foreground/30" />
                  </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{brand.name}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">{brand.description}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-primary group-hover:text-primary-foreground transition-colors group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                    Explorar Colección <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {brands.length === 0 && (
            <div className="text-center p-20 border border-dashed border-border rounded-3xl mt-10">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No hay marcas registradas</h3>
                <p className="text-muted-foreground">Usa el panel administrativo para agregar fabricantes o marcas.</p>
            </div>
        )}
      </div>
    </div>
  );
};
