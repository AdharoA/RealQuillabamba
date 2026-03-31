import React from 'react';

export const Footer = ({ settings }) => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-12 border-t border-border/20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary">{settings?.companyName || 'Real Quillabamba'}</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            {settings?.footerText || 'Lujo Auténtico. Diseño minimalista y elegante para resaltar tu estilo personal.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Secciones</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-primary transition-colors">Catálogo</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Nuevas Colecciones</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Diseñadores</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Envíos y Devoluciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>{settings?.footerEmail || 'contacto@realquillabamba.com'}</li>
            <li>{settings?.footerPhone || '+51 999 999 999'}</li>
            <li>{settings?.footerLocation || 'La Convención, Cusco'}</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} {settings?.companyName || 'Real Quillabamba'}. Todos los derechos reservados.
      </div>
    </footer>
  );
};
