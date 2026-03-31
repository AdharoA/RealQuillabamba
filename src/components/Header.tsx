import React from 'react';
import { ShoppingCart, User, Moon, Sun, Gem } from 'lucide-react';

export const Header = ({ user, onNavigateAuth, isDarkMode, toggleDarkMode, onNavigateTo, settings }) => {
  let navLinks = [
    { id: 'shop', label: 'Catálogo', visible: true },
    { id: 'brands', label: 'Marcas', visible: true },
    { id: 'collections', label: 'Colecciones', visible: true },
    { id: 'gallery', label: 'Lookbook', visible: true }
  ];
  try {
    if (settings?.headerLinks) {
       navLinks = JSON.parse(settings.headerLinks);
    }
  } catch (e) {}

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer w-[30%]" onClick={() => onNavigateTo ? onNavigateTo('home') : window.location.reload()}>
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
          ) : (
            <Gem className="h-6 w-6 text-primary" />
          )}
          <span className="font-accent font-bold text-2xl tracking-widest text-primary">{settings?.companyName || 'Coco Vanilla'}</span>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8 w-[40%]">
          {navLinks.filter(l => l.visible).map(link => (
             <button key={link.id} onClick={() => onNavigateTo(link.id)} className="text-sm font-medium hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent pb-1">
               {link.label}
             </button>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 w-[30%]">
          <button onClick={toggleDarkMode} className="p-3 rounded-full hover:bg-muted transition-colors text-foreground">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <button onClick={() => onNavigateTo('admin')} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors pr-2 border-r border-border">Admin</button>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold cursor-pointer hover:bg-primary/90 transition-colors">
                {user.email ? user.email.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          ) : (
            <button onClick={onNavigateAuth} className="p-3 rounded-full hover:bg-muted transition-colors text-foreground ml-2">
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
