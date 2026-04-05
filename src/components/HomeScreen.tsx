import React from 'react';
import { Header } from './Header';
import { ProductCatalog } from './ProductCatalog';
import { Footer } from './Footer';

/**
 * Extracted HomeScreen matching the Figma layout.
 * Includes a Hero section and the ProductCatalog.
 */
export const HomeScreen = ({ user, onSelectProduct, onNavigateCart, onNavigateAuth, onNavigateTo, cartCount, isDarkMode, toggleDarkMode, settings }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        user={user} 
        onNavigateCart={onNavigateCart} 
        onNavigateAuth={onNavigateAuth}
        onNavigateTo={onNavigateTo}
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        settings={settings}
      />
      <main className="flex-1">
        <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center bg-background">
          <div className="absolute inset-0 z-0">
            <img src={settings?.heroBgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"} alt="Hero background" className="w-full h-full object-cover opacity-20 dark:opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-32 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-[1.1] text-foreground">
              {settings?.heroTitle || "Experience Rwandan"}<br/>
              {settings?.heroHighlight && <span className="text-accent italic font-light">{settings.heroHighlight}</span>}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-muted-foreground mb-12 leading-relaxed whitespace-pre-wrap">
              {settings?.heroSubtitle || "Hand-picked, artisanal coffee delivered directly to your door from the thousand hills of Rwanda."}
            </p>
            <button className="bg-primary text-primary-foreground text-sm font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest">
              {settings?.heroButtonText || "Explore Our Collection"}
            </button>
          </div>
        </section>
        <ProductCatalog onSelect={onSelectProduct} />
      </main>
      <Footer settings={settings} />
    </div>
  );
};
