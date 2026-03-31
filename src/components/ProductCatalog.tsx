import React, { useState, useEffect } from 'react';
import { Coffee, MapPin, ChevronRight, Loader2 } from 'lucide-react';

export const ProductCatalog = ({ onSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetch('http://localhost/RealQuillabamba/api/products.php')
       .then(res => res.json())
       .then(data => {
           if(!data.error) setProducts(data);
           setLoading(false);
       })
       .catch(err => {
           console.error("Error al cargar productos desde PHP MySQL", err);
           setLoading(false);
       });
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">Nuestro Catálogo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">Directamente desde la base de datos MySQL en InfinityFree.</p>
        </div>

        {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white dark:bg-muted/50 border border-transparent hover:border-border flex flex-col"
                  onClick={() => onSelect({...product, image: product.image_url, roast: product.category_name, region: product.status})}
                >
                  <div className="relative h-72 overflow-hidden m-2 rounded-[20px] bg-muted/30 flex items-center justify-center flex-shrink-0">
                    {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <Coffee className="h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full">
                      {product.category_name || 'Café'}
                    </div>
                  </div>
                  <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1.5 text-accent mb-3 uppercase tracking-widest text-[10px] font-black">
                        <MapPin className="h-3 w-3" />
                        <span>{product.status}</span>
                        </div>
                        <h3 className="text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-lg font-bold text-foreground">S/ {product.price}</span>
                      <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                  <div className="col-span-full py-10 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                      El catálogo en la base de datos está vacío. Usa el panel de administrador para crear productos.
                  </div>
              )}
            </div>
        )}
      </div>
    </section>
  );
};
