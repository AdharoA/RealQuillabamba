import React, { useState, useEffect } from 'react';
import { ProductCatalog } from './ProductCatalog';
import { ChevronDown, Filter } from 'lucide-react';

export const ShopScreen = ({ onSelectProduct, defaultBrand = null, settings = {} as any }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  
  // Selected Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(defaultBrand ? [defaultBrand] : []);

  useEffect(() => {
    fetch('http://localhost/RealQuillabamba/api/categories.php').then(res => res.json()).then(data => { if(!data.error) setCategories(data); });
    fetch('http://localhost/RealQuillabamba/api/brands.php').then(res => res.json()).then(data => { if(!data.error) setBrands(data); });
  }, []);

  const toggleCategory = (id) => {
      setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const toggleBrand = (name) => {
      setSelectedBrands(prev => prev.includes(name) ? prev.filter(b => b !== name) : [...prev, name]);
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 pt-12 border-b border-border pb-12">
          <h1 className="text-5xl md:text-6xl font-accent text-foreground mb-4">Nuestra Colección</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Descubre nuestra selección exclusiva. Te invitamos a navegar usando nuestros filtros inteligentes.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Sidebar Filtros (Estilo Falabella) */}
            <aside className="w-full lg:w-1/4 shrink-0 bg-card p-6 rounded-2xl border border-border sticky top-24 shadow-sm animate-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-2 font-bold mb-6 text-foreground pb-4 border-b border-border text-lg uppercase tracking-wider">
                    <Filter className="h-5 w-5 text-primary" /> Filtrar por
                </div>
                
                {/* Categorías */}
                <div className="mb-8">
                    <div className="flex items-center justify-between font-bold text-foreground mb-4 cursor-pointer hover:text-primary transition-colors">
                        <span>Categorías</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-3 pl-1">
                        {categories.map(c => (
                            <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="hidden" checked={selectedCategories.includes(c.id)} onChange={() => toggleCategory(c.id)} />
                                <div className={`w-5 h-5 flex-shrink-0 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${selectedCategories.includes(c.id) ? 'bg-primary border-primary scale-110' : 'border-border bg-background group-hover:border-primary'}`}>
                                    {selectedCategories.includes(c.id) && <div className="w-2.5 h-2.5 bg-primary-foreground rounded-sm" />}
                                </div>
                                <span className={`text-[15px] select-none transition-colors ${selectedCategories.includes(c.id) ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>{c.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Marcas */}
                {settings?.enableBrandsModule !== 'false' && (
                    <div>
                        <div className="flex items-center justify-between font-bold text-foreground mb-4 cursor-pointer hover:text-primary transition-colors">
                            <span>Marcas / Fabricante</span>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar pl-1">
                            {brands.map(b => (
                                <label key={b.id} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="hidden" checked={selectedBrands.includes(b.name)} onChange={() => toggleBrand(b.name)} />
                                    <div className={`w-5 h-5 flex-shrink-0 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${selectedBrands.includes(b.name) ? 'bg-primary border-primary scale-110' : 'border-border bg-background group-hover:border-primary'}`}>
                                        {selectedBrands.includes(b.name) && <div className="w-2.5 h-2.5 bg-primary-foreground rounded-sm" />}
                                    </div>
                                    <span className={`text-[15px] select-none transition-colors ${selectedBrands.includes(b.name) ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>{b.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Catálogo de Productos */}
            <div className="w-full lg:w-3/4 -mt-20">
                <ProductCatalog onSelect={onSelectProduct} filters={{ categories: selectedCategories, brands: selectedBrands }} />
            </div>
        </div>

      </div>
    </div>
  );
};
