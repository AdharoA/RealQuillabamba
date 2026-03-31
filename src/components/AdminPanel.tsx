import React, { useState, useEffect } from 'react';
import { Package, Settings, Bell, LayoutDashboard, Grid, Folder, LogOut, ArrowLeft, Plus, X, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost/RealQuillabamba/api';

export const AdminPanel = ({ onBack, settings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', category_id: '', image_url: '' });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch(`${API_URL}/categories.php`).then(res => res.json()).then(data => { if (!data.error) setCategories(data); });
    fetch(`${API_URL}/products.php`).then(res => res.json()).then(data => { if (!data.error) setProducts(data); });
  }, []);

  const handleSettingChange = (e) => {
    if (!onUpdateSettings) return;
    const { name, value } = e.target;
    onUpdateSettings(prev => ({ ...prev, [name]: value }));
  };

  const currentLinks = (() => {
    try { return JSON.parse(settings?.headerLinks || '[]'); } 
    catch(e) { 
      return [
        { id: 'shop', label: 'Catálogo', visible: true },
        { id: 'brands', label: 'Marcas', visible: true },
        { id: 'collections', label: 'Colecciones', visible: true },
        { id: 'gallery', label: 'Lookbook', visible: true }
      ];
    }
  })();

  const handleLinkToggle = (id) => {
    const updated = currentLinks.map(l => l.id === id ? { ...l, visible: !l.visible } : l);
    onUpdateSettings(prev => ({ ...prev, headerLinks: JSON.stringify(updated) }));
  };
  
  const handleLinkLabelChange = (id, newLabel) => {
    const updated = currentLinks.map(l => l.id === id ? { ...l, label: newLabel } : l);
    onUpdateSettings(prev => ({ ...prev, headerLinks: JSON.stringify(updated) }));
  };


  const handleSaveSettings = async () => {
      setIsSavingSettings(true);
      try {
          const res = await fetch(`${API_URL}/settings.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settings)
          });
          const data = await res.json();
          if (data.status === 'success') {
              alert("Ajustes persistidos en la Base de Datos!");
          }
      } catch (e) {
          alert('Error de conexión con la base de datos PHP');
      }
      setIsSavingSettings(false);
  };

  const handleAddCategory = async () => {
      if(!newCategory.name) return;
      try {
          const res = await fetch(`${API_URL}/categories.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newCategory)
          });
          const data = await res.json();
          if(data.status === 'success') {
              setCategories([...categories, { ...newCategory, id: data.id }]);
              setShowCategoryModal(false);
              setNewCategory({ name: '', description: '' });
          } else {
              alert(data.error || 'Error al guardar categoría');
          }
      } catch (e) { alert('Error de conexión'); console.error(e); }
  };

  const handleAddProduct = async () => {
      if(!newProduct.name || !newProduct.price) {
          alert('El nombre y el precio son obligatorios');
          return;
      }
      setIsSavingProduct(true);
      try {
          const res = await fetch(`${API_URL}/products.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newProduct)
          });
          const data = await res.json();
          if(data.status === 'success') {
              const catName = categories.find(c => c.id == newProduct.category_id)?.name;
              setProducts([{ ...newProduct, id: data.id, category_name: catName, status: 'Disponible' }, ...products]);
              setShowProductModal(false);
              setNewProduct({ name: '', description: '', price: '', stock: '', category_id: '', image_url: '' });
          } else {
              alert(data.error || 'Error del servidor al guardar producto');
          }
      } catch (e) { alert('Error de conexión'); console.error(e); }
      setIsSavingProduct(false);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Panel General';
      case 'products': return 'Gestión de Productos';
      case 'categories': return 'Gestión de Categorías';
      case 'collections': return 'Colecciones';
      case 'settings': return 'Configuración de la Tienda';
      default: return 'Panel General';
    }
  };

  // Calculate stats
  const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.stock || 0)), 0);
  const totalStock = products.reduce((sum, p) => sum + parseInt(p.stock || 0), 0);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col shadow-sm hidden md:flex">
        <div className="mb-10 flex flex-col items-center justify-center gap-2 text-center">
            {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto object-contain mx-auto mb-2" />
            ) : (
                <div className="bg-primary/10 p-3 rounded-full mb-2 flex items-center justify-center">
                    <Grid className="h-8 w-8 text-primary" />
                </div>
            )}
            <span className="font-serif font-bold text-xl text-primary leading-tight">{settings?.companyName || 'Coco Vanilla'}</span>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-1">Panel Administrativo</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'dashboard' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <LayoutDashboard className="h-5 w-5"/> Panel General
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'products' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Package className="h-5 w-5"/> Productos
          </button>
          <button onClick={() => setActiveTab('categories')} className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'categories' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Grid className="h-5 w-5"/> Categorías
          </button>
          <button onClick={() => setActiveTab('collections')} className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'collections' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Folder className="h-5 w-5"/> Colecciones
          </button>
          
          <div className="my-4 border-t border-border"></div>
          
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'settings' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Settings className="h-5 w-5"/> Ajustes de Tienda
          </button>
          <button onClick={onBack} className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all text-muted-foreground hover:bg-muted hover:text-foreground">
              <ArrowLeft className="h-5 w-5"/> Ver Sitio Web
          </button>
          <button onClick={onBack} className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all text-red-500 hover:bg-red-50 hover:text-red-700 mt-auto">
              <LogOut className="h-5 w-5"/> Cerrar Sesión
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-card p-6 rounded-2xl shadow-sm border border-border">
            <h1 className="text-2xl font-bold text-foreground">{getTabTitle()}</h1>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm">Bienvenido, <strong>Admin</strong></span>
                <button className="p-2 bg-muted/50 rounded-full text-foreground hover:bg-muted transition-colors"><Bell className="h-5 w-5"/></button>
            </div>
        </header>
        
        {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-2xl border border-border flex flex-col items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary"><Package className="h-6 w-6"/></div>
                        <div>
                            <div className="text-3xl font-bold text-foreground mb-1">{products.length}</div>
                            <div className="text-sm text-muted-foreground font-medium">Total de Productos</div>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-2xl border border-border flex flex-col items-start gap-4">
                        <div className="bg-emerald-500/10 p-3 flex items-center justify-center rounded-xl text-emerald-600 h-12 w-12"><span className="font-bold text-xl">S/</span></div>
                        <div>
                            <div className="text-3xl font-bold text-foreground mb-1">S/ {totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                            <div className="text-sm text-muted-foreground font-medium">Valor del Inventario</div>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-2xl border border-border flex flex-col items-start gap-4">
                        <div className="bg-blue-500/10 p-3 rounded-xl text-blue-600"><Grid className="h-6 w-6"/></div>
                        <div>
                            <div className="text-3xl font-bold text-foreground mb-1">{categories.length}</div>
                            <div className="text-sm text-muted-foreground font-medium">Categorías</div>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-2xl border border-border flex flex-col items-start gap-4">
                        <div className="bg-amber-500/10 p-3 rounded-xl text-amber-600"><Folder className="h-6 w-6"/></div>
                        <div>
                            <div className="text-3xl font-bold text-foreground mb-1">{totalStock}</div>
                            <div className="text-sm text-muted-foreground font-medium">Unidades en Stock</div>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-lg font-bold">Últimas Adiciones a la DB</h2>
                        <button onClick={() => setActiveTab('products')} className="text-sm font-medium text-primary hover:underline">Ver todos</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/30 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-medium">ID</th>
                                    <th className="px-6 py-4 font-medium">Nombre</th>
                                    <th className="px-6 py-4 font-medium">Categoría</th>
                                    <th className="px-6 py-4 font-medium">Precio</th>
                                    <th className="px-6 py-4 font-medium">Stock</th>
                                    <th className="px-6 py-4 font-medium">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.slice(0, 5).map(p => (
                                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-muted-foreground">#{p.id}</td>
                                        <td className="px-6 py-4 font-medium text-foreground">{p.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{p.category_name}</td>
                                        <td className="px-6 py-4">S/ {p.price}</td>
                                        <td className="px-6 py-4">{p.stock}</td>
                                        <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">{p.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'products' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-in fade-in shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <input type="text" placeholder="Buscar productos..." className="px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none max-w-sm w-full" />
                    <button onClick={() => setShowProductModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4"/> Agregar Producto
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4 font-medium">Nombre</th>
                                <th className="px-6 py-4 font-medium">Categoría</th>
                                <th className="px-6 py-4 font-medium">Precio</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-muted/30">
                                    <td className="px-6 py-4 font-medium text-foreground">{p.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{p.category_name}</td>
                                    <td className="px-6 py-4">S/ {p.price}</td>
                                    <td className="px-6 py-4">{p.stock}</td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan={4} className="p-16 text-center text-muted-foreground">Sin productos registrados en MySQL</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'categories' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-in fade-in shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <h2 className="text-lg font-bold">Jerarquía de la Tienda</h2>
                    <button onClick={() => setShowCategoryModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4"/> Agregar Categoría
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Nombre de Categoría</th>
                                <th className="px-6 py-4 font-medium">Descripción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.map(c => (
                                <tr key={c.id} className="hover:bg-muted/30">
                                    <td className="px-6 py-4">#{c.id}</td>
                                    <td className="px-6 py-4 font-medium text-foreground">{c.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{c.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'collections' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-in fade-in shadow-sm">
                <div className="p-16 text-center text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium text-lg text-foreground mb-1">Gestor de Colecciones exclusivas</p>
                    <p className="text-sm">Enlace MySQL en construcción...</p>
                </div>
            </div>
        )}

        {activeTab === 'settings' && (
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm max-w-2xl animate-in fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <Settings className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Personalización del UI</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">Modifica la apariencia del proyecto. Los cambios viajarán al servidor y se aplicarán al instante.</p>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Logo URL</label>
                        <input type="text" name="logoUrl" value={settings?.logoUrl || ''} onChange={handleSettingChange} placeholder="https://ejemplo.com/mologo.png" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company Name (Brand)</label>
                        <input type="text" name="companyName" value={settings?.companyName || ''} onChange={handleSettingChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Footer Text (About)</label>
                        <textarea name="footerText" value={settings?.footerText || ''} onChange={handleSettingChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Primary Color (Theme HEX)</label>
                        <div className="flex gap-4 items-center">
                            <input type="color" name="primaryColor" value={settings?.primaryColor || '#723b13'} onChange={handleSettingChange} className="h-12 w-20 rounded-lg cursor-pointer border-0 p-1 bg-background" />
                            <input type="text" name="primaryColor" value={settings?.primaryColor || '#723b13'} onChange={handleSettingChange} className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground font-mono uppercase" />
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">Módulos del Menú (Header)</h3>
                        <div className="space-y-3">
                            {currentLinks.map(link => (
                              <div key={link.id} className="flex items-center gap-4 bg-background p-3 rounded-lg border border-border">
                                <input type="checkbox" checked={link.visible} onChange={() => handleLinkToggle(link.id)} className="w-5 h-5 accent-primary cursor-pointer"/>
                                <input type="text" value={link.label} onChange={(e) => handleLinkLabelChange(link.id, e.target.value)} className="flex-1 bg-transparent outline-none text-foreground font-medium" />
                                <span className="text-xs text-muted-foreground uppercase">{link.id}</span>
                              </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">Información de Contacto (Footer)</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
                                <input type="email" name="footerEmail" value={settings?.footerEmail || 'contacto@realquillabamba.com'} onChange={handleSettingChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                                <input type="text" name="footerPhone" value={settings?.footerPhone || '+51 999 999 999'} onChange={handleSettingChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Ubicación / Dirección</label>
                                <input type="text" name="footerLocation" value={settings?.footerLocation || 'La Convención, Cusco'} onChange={handleSettingChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-end">
                        <button onClick={handleSaveSettings} disabled={isSavingSettings} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 flex items-center gap-2">
                           {isSavingSettings ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Guardar en Base de Datos'}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>

      {/* MOCK MODALS ACCIONABLES */}
      {showProductModal && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-card w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
                      <h3 className="font-bold text-lg text-foreground">Crear en Base de Datos</h3>
                      <button onClick={() => setShowProductModal(false)} className="text-muted-foreground hover:bg-muted p-1 rounded-full hover:text-foreground transition-colors"><X className="h-5 w-5"/></button>
                  </div>
                  <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Nombre del Producto</label>
                              <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Café de Altura" />
                          </div>
                          <div>
                              <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Categoría SQL</label>
                              <select value={newProduct.category_id} onChange={e => setNewProduct({...newProduct, category_id: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none">
                                 <option value="">Selecciona Categoría...</option>
                                 {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1">
                              <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Imagen URL</label>
                              <input type="text" value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 outline-none" placeholder="https://..." />
                          </div>
                          <div className="col-span-1 grid grid-cols-2 gap-4">
                               <div>
                                  <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Precio (S/)</label>
                                  <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none" placeholder="0.00" />
                              </div>
                              <div>
                                  <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Stock Real</label>
                                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none" placeholder="0" />
                              </div>
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Descripción Larga</label>
                          <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none resize-none" rows={3}></textarea>
                      </div>
                      <div className="pt-6 flex justify-end gap-3 border-t border-border mt-6">
                          <button onClick={() => setShowProductModal(false)} className="px-5 py-2.5 rounded-lg border border-border bg-transparent text-foreground hover:bg-muted font-medium transition-colors">Cancelar</button>
                          <button onClick={handleAddProduct} disabled={isSavingProduct} className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                              {isSavingProduct ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Guardar Producto (SQL POST)'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {showCategoryModal && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
                      <h3 className="font-bold text-lg text-foreground">Crear Categoría SQL</h3>
                      <button onClick={() => setShowCategoryModal(false)} className="text-muted-foreground hover:bg-muted p-1 rounded-full hover:text-foreground transition-colors"><X className="h-5 w-5"/></button>
                  </div>
                  <div className="p-6 space-y-4">
                      <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Nombre *</label>
                          <input type="text" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Accesorios" />
                      </div>
                      <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground uppercase tracking-wider">Descripción</label>
                          <textarea value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} className="w-full border border-border bg-background text-foreground rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none resize-none" rows={2}></textarea>
                      </div>
                      <div className="pt-6 flex justify-end gap-3 border-t border-border mt-6">
                          <button onClick={() => setShowCategoryModal(false)} className="px-5 py-2.5 rounded-lg border border-border bg-transparent text-foreground hover:bg-muted font-medium transition-colors">Cancelar</button>
                          <button onClick={handleAddCategory} className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm">Guardar en Base de Datos</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
