import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Laptop, Search, ShoppingBag, Heart, Star, 
  Truck, User, Menu, X, Plus, Minus, ArrowLeft, MapPin, 
  Package, ExternalLink, CreditCard, ChevronRight
} from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: "Melody Plush", price: 54.99, rating: 5, reviews: 12, img: "https://i.pinimg.com/736x/dc/29/d6/dc29d68ab99b94f32801b21e452a98d6.jpg", tag: "Limited", category: "Plushies" },
  { id: 2, name: "Sweet Bow Pink Sweater", price: 65.50, rating: 4, reviews: 85, img: "https://i.pinimg.com/1200x/33/24/a5/3324a56955b06133abe5d09da8567e8d.jpg", tag: "Popular", category: "Clothing" },
  { id: 3, name: "White Ruffle Cake Skirt", price: 89.00, rating: 5, reviews: 210, img: "https://i.pinimg.com/736x/12/88/d5/1288d594dec63d4c73c74967b6dbce59.jpg", tag: "Luxury", category: "Clothing" },
  { id: 4, name: "Pink Cute Rose Lamp", price: 49.99, rating: 4, reviews: 45, img: "https://i.pinimg.com/1200x/bc/7f/30/bc7f30a6a2f125fa24b186c1e2e04ccf.jpg", tag: "Essential", category: "Desk" },
  { id: 5, name: "Handcrafted Ceramic Mug", price: 35.00, rating: 5, reviews: 302, img: "https://i.pinimg.com/736x/8c/57/91/8c5791024c21919dae929beff390e5f6.jpg", tag: "New", category: "Desk" },
  { id: 6, name: "Earring Coquette Set", price: 22.50, rating: 4, reviews: 94, img: "https://i.pinimg.com/736x/5c/62/ab/5c62ab336ee7306a8ff3ad6e550a77a3.jpg", tag: "Sweet", category: "Jewels" }
];

const App = () => {
  const [device, setDevice] = useState('mobile'); 
  const [view, setView] = useState('shop');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'All') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeTab);
  }, [activeTab]);

  const toggleWishlist = (p) => {
    setWishlist(prev => prev.find(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]);
  };

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      return exists ? prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleOrder = (shippingData) => {
    const newOrder = {
      id: `B-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      total: (cart.reduce((acc, i) => acc + (i.price * i.qty), 0) * 0.4).toFixed(2),
      date: new Date().toLocaleDateString(),
      status: 'In Transit',
      shipping: shippingData
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setView('user');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-[#FDE2E8] flex flex-col items-center justify-center p-4 md:p-6 font-sans text-[#4a3a3d]">
      <div className="flex bg-white/80 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-white mb-6 md:mb-10 z-50">
        <button onClick={() => setDevice('mobile')} className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all duration-300 ${device === 'mobile' ? 'bg-[#FFF5F7] text-white shadow-lg shadow-pink-200' : 'text-[#FF85A2] hover:bg-pink-50'}`}>
          <Smartphone size={16} /> <span className="font-bold text-[10px] uppercase tracking-widest">Mobile</span>
        </button>
        <button onClick={() => setDevice('notebook')} className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all duration-300 ${device === 'notebook' ? 'bg-[#FFF5F7] text-white shadow-lg shadow-pink-200' : 'text-[#FF85A2] hover:bg-pink-50'}`}>
          <Laptop size={16} /> <span className="font-bold text-[10px] uppercase tracking-widest">Desktop</span>
        </button>
      </div>

      <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white shadow-[0_40px_100px_-20px_rgba(255,182,197,0.3)] relative overflow-hidden
        ${device === 'mobile' ? 'w-[375px] h-[780px] rounded-[3rem] border-[10px] border-[#1a1a1a]' : 'w-full max-w-[1240px] h-[800px] rounded-3xl border border-pink-100'}`}>
        
        <div className="h-full flex flex-col bg-white">
          <header className={`sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-pink-50/50 flex items-center justify-between px-5 md:px-8 py-3.5`}>
            <div className="flex items-center gap-3 md:gap-6">
              <h1 onClick={() => setView('shop')} className={`font-black italic tracking-tighter cursor-pointer group leading-none ${device === 'mobile' ? 'text-sm' : 'text-xl'}`}>
                <span className="text-[#FF85A2] group-hover:text-[#ff6b8e] transition-colors uppercase">Melody</span>
                <span className="text-[#4a3a3d] opacity-30 group-hover:opacity-100 transition-opacity uppercase ml-1">Collective</span>
              </h1>
            </div>

            <div className={`flex items-center text-[#4a3a3d] ${device === 'mobile' ? 'gap-3' : 'gap-5'}`}>
              <Search size={16} strokeWidth={2} className="cursor-pointer hover:text-[#FF85A2]" />
              <div className="relative cursor-pointer group" onClick={() => setView('wishlist')}>
                <Heart size={16} strokeWidth={2} className={wishlist.length ? 'fill-[#FF85A2] text-[#FF85A2]' : 'group-hover:text-[#FF85A2]'} />
              </div>
              <div className="relative cursor-pointer group" onClick={() => setView('cart')}>
                <ShoppingBag size={16} strokeWidth={2} className="group-hover:text-[#FF85A2]" />
                {cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#FF85A2] text-white text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">{cart.length}</span>}
              </div>
              <User size={16} strokeWidth={2} className="cursor-pointer hover:text-[#FF85A2]" onClick={() => setView('user')} />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto custom-scroll pb-10">
            {view === 'shop' && (
              <div className={`animate-in fade-in duration-700 ${device === 'mobile' ? 'p-5' : 'p-10'}`}>
                <section className={`relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 group ${device === 'mobile' ? 'h-[240px]' : 'h-[400px]'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD1DC] via-[#FFB7C5] to-[#FF85A2]"></div>
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <div className={`relative h-full flex flex-col justify-center ${device === 'mobile' ? 'p-7' : 'p-16'}`}>
                    <span className="text-white font-black text-[8px] tracking-[0.3em] uppercase mb-2 opacity-80 leading-none">Global Welcome Offer</span>
                    <h2 className={`text-white font-black italic leading-[0.85] mb-4 drop-shadow-2xl ${device === 'mobile' ? 'text-4xl' : 'text-7xl'}`}>60% OFF</h2>
                    <p className={`text-white/90 font-bold uppercase tracking-widest leading-tight mb-6 ${device === 'mobile' ? 'text-[9px] max-w-[140px]' : 'text-base max-w-xs'}`}>Applied at your suite checkout.</p>
                  </div>
                </section>

                <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2 no-scrollbar">
                  {['All', 'Plushies', 'Clothing', 'Desk', 'Jewels'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#4a3a3d] text-white border-[#4a3a3d]' : 'bg-transparent text-slate-400 border-slate-100'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                <div className={`grid gap-x-5 gap-y-10 ${device === 'notebook' ? 'grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} onWish={toggleWishlist} isWished={wishlist.find(w => w.id === p.id)} device={device} />
                  ))}
                </div>
              </div>
            )}

            {view === 'cart' && <CartView cart={cart} updateQty={updateQty} onProceed={() => setView('checkout')} onBack={() => setView('shop')} device={device} />}
            {view === 'checkout' && <CheckoutView subtotal={cartSubtotal} onComplete={handleOrder} onBack={() => setView('cart')} device={device} />}
            {view === 'wishlist' && <WishlistView items={wishlist} onBack={() => setView('shop')} device={device} onAdd={addToCart} />}
            {view === 'user' && <UserView orders={orders} onBack={() => setView('shop')} device={device} />}
          </main>
        </div>
      </div>
      <p className="mt-6 text-slate-400 font-bold text-[9px] tracking-[0.3em] uppercase opacity-40">Melody Boutique © 2026</p>
    </div>
  );
};

const ProductCard = ({ product, onAdd, onWish, isWished, device }) => (
  <div className="group relative animate-in slide-in-from-bottom-4 duration-500">
    <div className={`aspect-[4/5] bg-[#fdfafb] rounded-[2rem] overflow-hidden relative mb-4 border border-pink-50/50`}>
      <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />      <div className="absolute top-3 left-3">
        <span className="bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest text-[#FF85A2] shadow-sm">{product.tag}</span>
      </div>
      <button onClick={() => onWish(product)} className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform">
        <Heart size={10} className={isWished ? 'fill-[#FF85A2] text-[#FF85A2]' : 'text-slate-300'} />
      </button>
    </div>
    <div className="px-1">
      <div className="flex justify-between items-start mb-1 gap-2">
        <h3 className="text-[11px] font-black text-[#4a3a3d] leading-tight uppercase tracking-tight">{product.name}</h3>
        <span className="text-[11px] font-black text-[#FF85A2]">${product.price.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'} />)}
      </div>
      <button onClick={() => onAdd(product)} className="w-full py-3 bg-white border border-pink-100 rounded-xl text-[8px] font-black uppercase tracking-widest text-[#FF85A2] hover:bg-[#FF85A2] hover:text-white transition-all shadow-sm">
        Add to Suite
      </button>
    </div>
  </div>
);

const CartView = ({ cart, updateQty, onProceed, onBack, device }) => (
  <div className={`mx-auto animate-in fade-in duration-500 ${device === 'mobile' ? 'p-6' : 'p-12 max-w-2xl'}`}>
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#4a3a3d]">Your Suite</h2>
      <button onClick={onBack} className="text-[8px] font-black uppercase tracking-widest text-[#FF85A2] flex items-center gap-2">
        <ArrowLeft size={10}/> Continue Shop
      </button>
    </div>
    {cart.length === 0 ? (
      <div className="text-center py-20 opacity-20 font-black italic tracking-widest text-[10px] uppercase">Suite is Empty</div>
    ) : (
      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 pb-6 border-b border-pink-50">
            <img src={item.img} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-black text-[10px] mb-1 uppercase tracking-tight leading-tight">{item.name}</h4>
              <p className="text-[#FF85A2] font-black text-[10px]">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-2.5 py-1.5 rounded-xl h-fit self-center">
              <Minus size={9} className="cursor-pointer text-slate-400" onClick={() => updateQty(item.id, -1)} />
              <span className="text-[9px] font-black">{item.qty}</span>
              <Plus size={9} className="cursor-pointer text-[#FF85A2]" onClick={() => updateQty(item.id, 1)} />
            </div>
          </div>
        ))}
        <div className="pt-8">
          <div className="flex justify-between items-end mb-8 opacity-40">
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Subtotal</span>
            <span className="text-xl font-black">${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
          </div>
          <button onClick={onProceed} className="w-full py-4 bg-[#4a3a3d] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[9px] shadow-xl">Proceed to Shipping</button>
        </div>
      </div>
    )}
  </div>
);

const CheckoutView = ({ subtotal, onComplete, onBack, device }) => {
  const [formData, setFormData] = useState({ name: '', address: '', email: '' });
  const discounted = (subtotal * 0.4).toFixed(2);

  return (
    <div className={`mx-auto animate-in fade-in duration-500 ${device === 'mobile' ? 'p-6' : 'p-12 max-w-2xl'}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#4a3a3d]">Shipping</h2>
        <button onClick={onBack} className="text-[8px] font-black uppercase tracking-widest text-[#FF85A2]">Back to Suite</button>
      </div>
      <div className="space-y-4 mb-10">
        <input placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-xl p-4 text-[10px] font-bold outline-pink-200" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input placeholder="Shipping Address" className="w-full bg-slate-50 border-none rounded-xl p-4 text-[10px] font-bold outline-pink-200" onChange={e => setFormData({...formData, address: e.target.value})} />
        <input placeholder="Email for Tracking" className="w-full bg-slate-50 border-none rounded-xl p-4 text-[10px] font-bold outline-pink-200" onChange={e => setFormData({...formData, email: e.target.value})} />
      </div>
      <div className="bg-[#fdfafb] p-6 rounded-[2rem] border border-pink-50 mb-8">
        <div className="flex justify-between mb-2 opacity-50 text-[8px] font-black uppercase tracking-widest">
          <span>Suite Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-[8px] font-black uppercase tracking-widest text-emerald-500">
          <span>First Buy Promo (60% Off)</span>
          <span>-${(subtotal * 0.6).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-end border-t border-pink-50 pt-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4a3a3d]">Final Investment</span>
          <span className="text-3xl font-black text-[#FF85A2]">${discounted}</span>
        </div>
      </div>
      
      <button onClick={() => onComplete(formData)} className="w-full py-5 bg-[#FF85A2] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-pink-100">Complete Purchase ✨</button>
    </div>
  );
};

const WishlistView = ({ items, onBack, device, onAdd }) => (
  <div className={`mx-auto animate-in fade-in duration-500 ${device === 'mobile' ? 'p-6' : 'p-12'}`}>
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#4a3a3d]">Desires</h2>
      <button onClick={onBack} className="text-[8px] font-black uppercase tracking-widest text-[#FF85A2] flex items-center gap-2">
        <ArrowLeft size={10}/> Close
      </button>
    </div>
    <div className={`grid gap-8 ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-3 lg:grid-cols-4'}`}>
      {items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onWish={()=>{}} isWished={true} device={device} />)}
    </div>
  </div>
);

const UserView = ({ orders, onBack, device }) => (
  <div className={`mx-auto animate-in slide-in-from-right-10 duration-500 ${device === 'mobile' ? 'p-6' : 'p-12 max-w-3xl'}`}>
    <div className={`flex items-center gap-6 mb-12 ${device === 'mobile' ? 'flex-col text-center' : ''}`}>
      <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-tr from-[#FFD1DC] to-[#FF85A2] p-0.5 shadow-xl">
        <div className="w-full h-full rounded-[1.7rem] bg-white flex items-center justify-center text-2xl shadow-inner">🧸</div>
      </div>
      <div>
        <h2 className="text-2xl font-black italic text-[#4a3a3d] uppercase tracking-tighter">Collector_01</h2>
        <div className={`flex gap-3 mt-2 ${device === 'mobile' ? 'justify-center' : ''}`}>
          <span className="px-2 py-0.5 bg-pink-50 text-[#FF85A2] text-[6px] font-black uppercase tracking-widest rounded-full">Pro Tier Member</span>
        </div>
      </div>
    </div>

    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30">Order Manifest</h3>
    <div className="space-y-4 mb-10">
      {orders.length === 0 ? (
        <p className="text-[9px] font-bold text-slate-300 italic">No recent investments...</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="bg-white rounded-[1.5rem] p-5 border border-pink-50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black italic text-[#4a3a3d]">{order.id}</span>
              <span className="text-[7px] font-black uppercase tracking-widest text-emerald-400">{order.status}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-300 mb-0.5">{order.date}</p>
                <p className="text-[9px] font-bold text-[#4a3a3d]">{order.items.length} Curated Items</p>
              </div>
              <p className="text-lg font-black text-[#FF85A2]">${order.total}</p>
            </div>
          </div>
        ))
      )}
    </div>

    <div className="space-y-2.5">
      {['Shipping Methods', 'Account Privacy', 'Global Settings', 'Logout'].map(opt => (
        <div key={opt} className="flex items-center justify-between p-4 bg-white border border-pink-50 rounded-xl hover:bg-pink-50/30 cursor-pointer transition-colors group">
          <span className="text-[8px] font-black uppercase tracking-widest text-[#4a3a3d] group-hover:text-[#FF85A2]">{opt}</span>
          <ChevronRight size={12} className="text-slate-200 group-hover:text-[#FF85A2]" />
        </div>
      ))}
    </div>
  </div>
);

export default App;
