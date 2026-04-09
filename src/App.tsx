import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ShopScreen } from './components/ShopScreen';
import { BrandsScreen } from './components/BrandsScreen';
import { CollectionsScreen } from './components/CollectionsScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { AdminPanel } from './components/AdminPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';

// Define the root App component matching the original layout extracted
export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [settings, setSettings] = useState({
    companyName: 'Impactful Coffee',
    logoUrl: '',
    footerText: 'Directly from the lush hills of Rwanda to your cup. We empower local farmers while delivering the finest artisanal coffee.',
    primaryColor: '#723B13'
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/settings.php`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(err => console.error("Error loading settings:", err));
  }, []);

  useEffect(() => {
    const applyPrimaryColor = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }
      
      let rf = r / 255, gf = g / 255, bf = b / 255;
      let max = Math.max(rf, gf, bf), min = Math.min(rf, gf, bf);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
          case gf: h = (bf - rf) / d + 2; break;
          case bf: h = (rf - gf) / d + 4; break;
        }
        h /= 6;
      }
      
      document.documentElement.style.setProperty('--primary', `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`);
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (luminance > 0.6) {
        document.documentElement.style.setProperty('--primary-foreground', '0 0% 0%'); 
      } else {
        document.documentElement.style.setProperty('--primary-foreground', '210 40% 98%'); 
      }
    };
    if (settings.primaryColor) {
      applyPrimaryColor(settings.primaryColor);
    }
  }, [settings.primaryColor]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const [shopDefaultBrand, setShopDefaultBrand] = useState(null);

  const navigateTo = (screen, context: any = null) => {
    setActiveScreen(screen);
    if (screen === 'shop' && context?.brand) setShopDefaultBrand(context.brand);
    else if (screen === 'shop') setShopDefaultBrand(null);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    if (activeScreen === 'auth') {
      return <AuthScreen onAuth={(u) => { setUser(u); navigateTo('home'); }} onCancel={() => navigateTo('home')} />;
    }
    if (activeScreen === 'admin') {
      return <AdminPanel onBack={() => navigateTo('home')} settings={settings} onUpdateSettings={setSettings} />;
    }
    if (activeScreen === 'product' && selectedProduct) {
      return <ProductDetails product={selectedProduct} onBack={() => navigateTo('home')} />;
    }
    
    const headerProps = {
      user, 
      onNavigateAuth: () => navigateTo('auth'),
      onNavigateTo: navigateTo,
      isDarkMode,
      toggleDarkMode,
      settings
    };

    let content = null;
    if (activeScreen === 'shop') content = <ShopScreen onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('product'); }} defaultBrand={shopDefaultBrand} settings={settings} />;
    else if (activeScreen === 'brands') content = <BrandsScreen onBrandSelect={(b) => navigateTo('shop', { brand: b })} />;
    else if (activeScreen === 'collections') content = <CollectionsScreen />;
    else if (activeScreen === 'gallery') content = <GalleryScreen />;
    else content = <HomeScreen 
      user={user} 
      onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('product'); }} 
      onNavigateAuth={() => navigateTo('auth')}
      onNavigateTo={navigateTo}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      settings={settings}
    />;

    // Provide base layout for new pages
    if (['shop', 'brands', 'collections', 'gallery'].includes(activeScreen)) {
       return (
         <div className="flex flex-col min-h-screen">
           <Header {...headerProps} />
           <main className="flex-1">{content}</main>
           <Footer settings={settings} />
         </div>
       );
    }
    
    return content;
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-background text-foreground transition-colors duration-300 relative`}>
       {renderScreen()}
       <AIChat />
    </div>
  );
}
