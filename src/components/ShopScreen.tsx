import React from 'react';
import { ProductCatalog } from './ProductCatalog';

export const ShopScreen = ({ onSelectProduct }) => {
  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 pt-12">
          <h1 className="text-5xl md:text-6xl font-accent text-foreground mb-6">Nuestra Colección</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Descubre nuestra selección exclusiva de prendas y accesorios de diseñador. Minimalismo y elegancia en cada detalle.
          </p>
        </div>
        
        {/* We reuse the catalog but ideally we could add filters here */}
        <ProductCatalog onSelect={onSelectProduct} />
      </div>
    </div>
  );
};
