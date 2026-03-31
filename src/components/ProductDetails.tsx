import React from 'react';
import { ArrowLeft, ShoppingBag, Tag, Palette } from 'lucide-react';

export const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Regresar al Catálogo
        </button>

        <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border lg:flex dark:bg-muted/50">
          <div className="lg:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 lg:h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-16 lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sm text-primary mb-4 font-semibold uppercase tracking-widest">
              <Tag className="h-4 w-4" /> {product.brand || 'Coco Vanilla'}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-accent text-foreground mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-foreground/80 mb-8">S/ {product.price.toFixed(2)}</p>
            
            <div className="h-px w-full bg-border mb-8"></div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 text-sm text-foreground uppercase tracking-widest font-medium border border-border">
                <Palette className="h-4 w-4 text-primary" /> 
                Color: {product.color || 'Único'}
              </div>
              <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 text-sm text-foreground uppercase tracking-widest font-medium border border-border">
                Tallas: {product.sizes || 'S, M, L'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={onBack}
                className="flex-1 bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg py-4 px-8"
              >
                <ShoppingBag className="h-6 w-6" />
                Catálogo Principal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
