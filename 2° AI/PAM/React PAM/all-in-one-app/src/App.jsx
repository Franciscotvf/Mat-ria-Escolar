import { useState, useEffect, useMemo } from 'react';
import {
  Bot,
  Home,
  Package,
  Sliders,
  Cpu,
  ShoppingBag,
  ChevronLeft,
  Heart,
  Star,
  Plus,
  Minus,
  Search,
  Bell,
  Wind,
  Sun,
  Battery,
  CheckCircle2,
  X,
  ArrowRight,
  Lock,
  Mail,
  User,
  CreditCard,
  Check,
  Ruler,
  Weight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeScreen, setActiveScreen] = useState('splash');
  const [authTab, setAuthTab] = useState('login');

  // Time & Status State
  const [currentTime, setCurrentTime] = useState('09:41');

  // Shopping Cart & Discount State
  const [cart, setCart] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [wishlist, setWishlist] = useState(['omnibot-x1']);

  // Product Customizer State
  const [customizerColor, setCustomizerColor] = useState({
    name: 'Preto Titanium',
    hex: '#1e293b',
    priceAdd: 0
  });
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // IoT Devices Control State
  const [vacuumState, setVacuumState] = useState({
    active: true,
    suction: 'Padrão',
    battery: 88,
    status: 'Executando Limpeza Automatizada'
  });
  const [purifierActive, setPurifierActive] = useState(true);
  const [lightState, setLightState] = useState({
    active: true,
    brightness: 85,
    colorHex: '#f59e0b',
    colorName: 'Quente'
  });
  const [selectedRoomTab, setSelectedRoomTab] = useState('cozinha');

  // Notification Toast State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Clock Update Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 3000);
  };

  // Wishlist Toggle
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        showToast('Removido dos favoritos', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Adicionado aos favoritos!');
        return [...prev, id];
      }
    });
  };

  // Quick Add Product to Cart
  const quickAddToCart = (name, price, color) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.name === name && i.color === color);
      if (existing) {
        return prevCart.map((i) =>
          i.name === name && i.color === color ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prevCart,
        {
          id: Date.now(),
          name,
          color,
          accessories: [],
          price,
          quantity: 1
        }
      ];
    });
    showToast(`${name} adicionado ao carrinho!`);
  };

  // Customizer Calculation
  const customizerTotalPrice = useMemo(() => {
    const base = 4899;
    const colorAdd = customizerColor.priceAdd;
    const accAdd = selectedAccessories.reduce((sum, item) => sum + item.price, 0);
    return base + colorAdd + accAdd;
  }, [customizerColor, selectedAccessories]);

  const toggleAccessory = (acc) => {
    setSelectedAccessories((prev) => {
      const exists = prev.some((item) => item.name === acc.name);
      if (exists) {
        return prev.filter((item) => item.name !== acc.name);
      }
      return [...prev, acc];
    });
  };

  const addCustomizedToCart = () => {
    const item = {
      id: Date.now(),
      name: 'OmniBot Pro X1 Custom',
      color: customizerColor.name,
      accessories: selectedAccessories.map((a) => a.name),
      price: customizerTotalPrice,
      quantity: 1
    };
    setCart((prev) => [...prev, item]);
    showToast('Robô customizado adicionado ao carrinho!');
    setActiveScreen('cart');
  };

  // Cart Functions
  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const newCart = [...prev];
      const item = newCart[index];
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return newCart.filter((_, i) => i !== index);
      }
      newCart[index] = { ...item, quantity: newQty };
      return newCart;
    });
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ALLINONE10') {
      setAppliedDiscount(0.10);
      showToast('Cupom ALLINONE10 aplicado: 10% OFF!');
    } else if (couponCode.trim() === '') {
      showToast('Digite um código de cupom', 'info');
    } else {
      showToast('Cupom inválido ou expirado', 'info');
    }
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartDiscountAmount = useMemo(() => {
    return cartSubtotal * appliedDiscount;
  }, [cartSubtotal, appliedDiscount]);

  const cartTotal = useMemo(() => {
    return cartSubtotal - cartDiscountAmount;
  }, [cartSubtotal, cartDiscountAmount]);

  const totalCartBadgeCount = useMemo(() => {
    return cart.reduce((sum, i) => sum + i.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-6 bg-slate-950 font-sans text-slate-800">
      
      {/* Container Device Frame */}
      <div className="relative w-full max-w-[390px] h-[840px] bg-slate-50 border-[10px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-950"></div>
        </div>

        {/* Top Status Bar */}
        <div className="w-full pt-3 px-6 flex justify-between items-center text-xs font-bold text-slate-800 z-40 bg-transparent shrink-0">
          <span>{currentTime}</span>
          <div className="flex items-center gap-2 text-slate-700 text-[11px]">
            <Battery className="w-4 h-4 text-slate-800" />
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toast.visible && (
          <div className="absolute top-12 left-4 right-4 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl border border-indigo-500/40 flex items-center justify-between z-50 animate-bounce">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 ${toast.type === 'info' ? 'text-cyan-400' : 'text-indigo-400'}`} />
              <span className="text-xs font-medium">{toast.message}</span>
            </div>
            <button onClick={() => setToast({ visible: false, message: '', type: 'success' })} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto relative flex flex-col bg-slate-50">
          
          {/* ================= 1. TELA DE SPLASH ================= */}
          {activeScreen === 'splash' && (
            <div className="flex flex-col justify-between items-center p-6 text-center h-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white">
              <div className="my-auto flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-xl opacity-60 animate-pulse"></div>
                  <div className="relative w-28 h-28 rounded-3xl bg-slate-900 border border-indigo-500/40 flex items-center justify-center shadow-2xl">
                    <Bot className="w-14 h-14 text-indigo-400" />
                  </div>
                </div>

                <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300">
                  ALL IN ONE
                </h1>
                <p className="text-xs font-medium tracking-widest text-indigo-300 mt-2 uppercase">
                  Automação & Robótica Integrada
                </p>
                <p className="text-xs text-slate-400 mt-5 max-w-xs leading-relaxed">
                  Controle seus robôs inteligentes e adquira o futuro da automação residencial.
                </p>
              </div>

              <div className="w-full pb-4">
                <button
                  onClick={() => setActiveScreen('auth')}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Iniciar Experiência</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-slate-500 mt-3">Versão React 2.4.0 • All in One Corp © 2026</p>
              </div>
            </div>
          )}

          {/* ================= 2. TELA DE LOGIN / CADASTRO ================= */}
          {activeScreen === 'auth' && (
            <div className="flex flex-col p-6 h-full bg-slate-50 justify-between">
              <div>
                <div className="flex items-center justify-between mt-1 mb-6">
                  <button
                    onClick={() => setActiveScreen('splash')}
                    className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-400">ALL IN ONE</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900">Bem-vindo de volta!</h2>
                <p className="text-xs text-slate-500 mt-1">Acesse sua conta para controlar seus dispositivos.</p>

                {/* Auth Tabs */}
                <div className="flex rounded-xl bg-slate-200/80 p-1 mt-5">
                  <button
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      authTab === 'login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      authTab === 'register' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Cadastrar
                  </button>
                </div>

                {authTab === 'login' ? (
                  <form onSubmit={(e) => { e.preventDefault(); setActiveScreen('home'); }} className="mt-5 flex flex-col gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">E-mail</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="email"
                          defaultValue="alex.tech@allinone.com"
                          required
                          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-600">Senha</label>
                        <a href="#" className="text-[10px] text-indigo-600 font-semibold">Esqueceu?</a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="password"
                          defaultValue="••••••••••••"
                          required
                          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <button type="submit" className="mt-2 w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20">
                      Entrar no Aplicativo
                    </button>
                  </form>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setActiveScreen('home'); }} className="mt-5 flex flex-col gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Nome Completo</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                        <input type="text" placeholder="Alex Silva" className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">E-mail</label>
                      <input type="email" placeholder="seu@email.com" className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Senha</label>
                      <input type="password" placeholder="Criar senha forte" className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <button type="submit" className="mt-2 w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md">
                      Criar Conta
                    </button>
                  </form>
                )}

                {/* Social Login */}
                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <span className="relative px-3 bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">Ou acesse com</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button onClick={() => setActiveScreen('home')} className="py-2 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-xs font-semibold text-slate-700">
                    Google
                  </button>
                  <button onClick={() => setActiveScreen('home')} className="py-2 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-xs font-semibold text-slate-700">
                    Apple
                  </button>
                  <button onClick={() => setActiveScreen('home')} className="py-2 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-xs font-semibold text-slate-700">
                    GitHub
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <button onClick={() => setActiveScreen('home')} className="text-xs text-indigo-600 font-bold hover:underline">
                  Continuar como visitante →
                </button>
              </div>
            </div>
          )}

          {/* ================= 3. TELA INICIAL (HOME) ================= */}
          {activeScreen === 'home' && (
            <div className="p-4 pb-20 flex flex-col gap-4">
              {/* Top User Header */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Olá, Alex 👋</span>
                    <h3 className="text-sm font-black text-slate-900">Sua Casa Conectada</h3>
                  </div>
                </div>
                <button onClick={() => showToast('Sem novas notificações', 'info')} className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center relative text-slate-600">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600"></span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar robôs, luzes, sensores..."
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs shadow-sm focus:outline-none focus:border-indigo-500"
                />
                <button className="absolute right-3 top-2.5 text-slate-400 hover:text-indigo-600">
                  <Sliders className="w-4 h-4" />
                </button>
              </div>

              {/* Hero Banner OmniBot Pro X1 */}
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 shadow-xl overflow-hidden">
                <div className="relative z-10 max-w-[200px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[9px] font-bold tracking-wider uppercase border border-indigo-400/30">
                    Lançamento 2026
                  </span>
                  <h4 className="text-lg font-black mt-2 leading-tight">OmniBot Pro X1</h4>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">Limpeza autônoma com radar LiDAR 3D e mop duplo.</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setActiveScreen('details')}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-xs font-bold text-white shadow-md"
                    >
                      Ver Detalhes
                    </button>
                    <span className="text-xs font-extrabold text-indigo-200">R$ 4.899</span>
                  </div>
                </div>
                <div className="absolute right-3 bottom-3 w-28 h-28 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center animate-pulse">
                    <Bot className="w-12 h-12 text-indigo-300" />
                  </div>
                </div>
              </div>

              {/* Showcase Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Robótica em Destaque</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">4 Produtos</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Card 1 */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="relative">
                      <span className="absolute top-0 left-0 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-bold text-[9px]">Top #1</span>
                      <button onClick={() => toggleWishlist('omnibot-x1')} className="absolute top-0 right-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes('omnibot-x1') ? 'text-red-500 fill-red-500' : ''}`} />
                      </button>
                      <div onClick={() => setActiveScreen('details')} className="cursor-pointer py-4 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                          <Bot className="w-8 h-8 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                        <span className="text-slate-400 font-normal">(128)</span>
                      </div>
                      <h5 onClick={() => setActiveScreen('details')} className="text-xs font-bold text-slate-900 cursor-pointer truncate mt-0.5">OmniBot Pro X1</h5>
                      <p className="text-[10px] text-slate-400 truncate">Robô Aspirador & Mop</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">R$ 4.899</span>
                        <button
                          onClick={() => quickAddToCart('OmniBot Pro X1', 4899, 'Preto Titanium')}
                          className="w-7 h-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="relative">
                      <span className="absolute top-0 left-0 px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 font-bold text-[9px]">Smart</span>
                      <button onClick={() => toggleWishlist('lightsphere')} className="absolute top-0 right-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes('lightsphere') ? 'text-red-500 fill-red-500' : ''}`} />
                      </button>
                      <div className="py-4 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center">
                          <Sun className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.8</span>
                        <span className="text-slate-400 font-normal">(94)</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5">LightSphere RGB Pro</h5>
                      <p className="text-[10px] text-slate-400 truncate">Luminária Inteligente</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">R$ 299</span>
                        <button
                          onClick={() => quickAddToCart('LightSphere RGB Pro', 299, 'RGB Standard')}
                          className="w-7 h-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="relative">
                      <button onClick={() => toggleWishlist('airsentinel')} className="absolute top-0 right-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes('airsentinel') ? 'text-red-500 fill-red-500' : ''}`} />
                      </button>
                      <div className="py-4 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center">
                          <Wind className="w-8 h-8 text-cyan-600" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                        <span className="text-slate-400 font-normal">(62)</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5">AirSentinel Purifier</h5>
                      <p className="text-[10px] text-slate-400 truncate">Robô Purificador</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">R$ 1.499</span>
                        <button
                          onClick={() => quickAddToCart('AirSentinel Purifier', 1499, 'Branco Glacial')}
                          className="w-7 h-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="relative">
                      <button onClick={() => toggleWishlist('hubmatter')} className="absolute top-0 right-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes('hubmatter') ? 'text-red-500 fill-red-500' : ''}`} />
                      </button>
                      <div className="py-4 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
                          <Cpu className="w-8 h-8 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.7</span>
                        <span className="text-slate-400 font-normal">(41)</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5">Hub Matter X</h5>
                      <p className="text-[10px] text-slate-400 truncate">Controlador Geral IoT</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">R$ 799</span>
                        <button
                          onClick={() => quickAddToCart('Hub Central Matter X', 799, 'Preto Obsidian')}
                          className="w-7 h-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ================= 4. TELA DE DETALHES DO PRODUTO ================= */}
          {activeScreen === 'details' && (
            <div className="p-4 pb-20 flex flex-col gap-4">
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setActiveScreen('home')}
                  className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-800">Especificações Técnicas</span>
                <button onClick={() => toggleWishlist('omnibot-x1')} className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                  <Heart className={`w-4 h-4 ${wishlist.includes('omnibot-x1') ? 'text-red-500 fill-red-500' : ''}`} />
                </button>
              </div>

              <div className="bg-gradient-to-b from-indigo-900 to-slate-900 rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-xl">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[9px] font-bold tracking-wider uppercase border border-indigo-400/30">
                  Top Especificação
                </span>
                
                <div className="my-6 flex justify-center items-center">
                  <div className="w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center animate-pulse">
                    <Bot className="w-16 h-16 text-indigo-300" />
                  </div>
                </div>

                <h3 className="text-xl font-black">OmniBot Pro X1</h3>
                <p className="text-xs text-indigo-200 mt-1">Robô Inteligente de Limpeza & Mapeamento 3D</p>
              </div>

              {/* Price Tag */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Preço à vista</span>
                  <div className="text-xl font-black text-slate-900">R$ 4.899,00</div>
                  <span className="text-[10px] text-emerald-600 font-bold">12x de R$ 408,25 sem juros</span>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Frete Grátis
                </span>
              </div>

              {/* Technical Specifications Grid */}
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Ficha Técnica</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Altura</span>
                    <span className="text-xs font-black text-slate-900">34 cm</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Weight className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Peso Total</span>
                    <span className="text-xs font-black text-slate-900">3.5 kg</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Battery className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Autonomia</span>
                    <span className="text-xs font-black text-slate-900">210 min</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Navegação</span>
                    <span className="text-xs font-black text-slate-900">LiDAR 3D + IA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveScreen('customizer')}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                <span>Personalizar este Robô</span>
              </button>
            </div>
          )}

          {/* ================= 5. TELA DE CUSTOMIZAÇÃO DE PRODUTO ================= */}
          {activeScreen === 'customizer' && (
            <div className="p-4 pb-20 flex flex-col gap-4">
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setActiveScreen('details')}
                  className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-800">Customizador All in One</span>
                <div className="w-9"></div>
              </div>

              {/* Live Preview Screen */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 text-white text-center shadow-lg">
                <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Preview Interativo</span>
                
                <div className="my-5 flex justify-center items-center">
                  <div className="w-28 h-28 rounded-full border-4 border-indigo-400/30 flex items-center justify-center transition-all bg-slate-900">
                    <Bot
                      className="w-14 h-14 transition-colors duration-300"
                      style={{
                        color: customizerColor.hex === '#f8fafc' ? '#ffffff' : customizerColor.hex === '#94a3b8' ? '#cbd5e1' : '#818cf8'
                      }}
                    />
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-200">
                  OmniBot Pro X1 <span className="text-indigo-400 font-semibold">({customizerColor.name})</span>
                </div>
              </div>

              {/* Color Picker */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">1. Seleção de Cor</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCustomizerColor({ name: 'Preto Titanium', hex: '#1e293b', priceAdd: 0 })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      customizerColor.name === 'Preto Titanium' ? 'border-2 border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700"></div>
                    <span className="text-[10px] font-bold text-slate-800">Preto Titanium</span>
                    <span className="text-[9px] text-slate-400 font-semibold">Padrão</span>
                  </button>

                  <button
                    onClick={() => setCustomizerColor({ name: 'Branco Glacial', hex: '#f8fafc', priceAdd: 0 })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      customizerColor.name === 'Branco Glacial' ? 'border-2 border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300"></div>
                    <span className="text-[10px] font-bold text-slate-800">Branco Glacial</span>
                    <span className="text-[9px] text-slate-400 font-semibold">+ R$ 0</span>
                  </button>

                  <button
                    onClick={() => setCustomizerColor({ name: 'Prata Cyber', hex: '#94a3b8', priceAdd: 150 })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      customizerColor.name === 'Prata Cyber' ? 'border-2 border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-400 border border-slate-300"></div>
                    <span className="text-[10px] font-bold text-slate-800">Prata Cyber</span>
                    <span className="text-[9px] text-indigo-600 font-bold">+ R$ 150</span>
                  </button>
                </div>
              </div>

              {/* Accessories Selection */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">2. Acessórios Extras</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Módulo LiDAR 360° Extra', price: 450, desc: 'Mapeamento ultra-rápido' },
                    { name: 'Kit Mop Auto-Limpante', price: 380, desc: 'Panos rotativos duplos' },
                    { name: 'Bateria Extra HD (6400mAh)', price: 290, desc: '+120 min de autonomia' }
                  ].map((acc) => {
                    const isChecked = selectedAccessories.some((a) => a.name === acc.name);
                    return (
                      <label
                        key={acc.name}
                        onClick={() => toggleAccessory(acc)}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{acc.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{acc.desc}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-indigo-600">+ R$ {acc.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Customizer Add to Cart Box */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-600">Valor Configurado:</span>
                  <span className="text-xl font-black text-slate-900">
                    R$ {customizerTotalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={addCustomizedToCart}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar Configuração ao Carrinho</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= 6. TELA DE CARRINHO DE COMPRAS ================= */}
          {activeScreen === 'cart' && (
            <div className="p-4 pb-20 flex flex-col gap-4">
              <div className="flex items-center justify-between pt-1">
                <h3 className="text-base font-black text-slate-900">Carrinho de Compras</h3>
                {cart.length > 0 && (
                  <button onClick={() => setCart([])} className="text-xs text-red-500 font-bold hover:underline">
                    Esvaziar
                  </button>
                )}
              </div>

              {/* List of Cart Items */}
              {cart.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center my-6">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Seu carrinho está vazio</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Explore os modelos e automações disponíveis</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                        <p className="text-[10px] text-slate-400 font-medium">Cor: {item.color}</p>
                        {item.accessories?.length > 0 && (
                          <p className="text-[9px] text-indigo-600 truncate font-semibold">+ {item.accessories.join(', ')}</p>
                        )}
                        <span className="text-xs font-black text-slate-900 mt-1 block">
                          R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
                        <button onClick={() => updateCartQty(idx, -1)} className="w-6 h-6 rounded-lg bg-white text-slate-700 text-xs font-bold flex items-center justify-center shadow-sm">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button onClick={() => updateCartQty(idx, 1)} className="w-6 h-6 rounded-lg bg-white text-slate-700 text-xs font-bold flex items-center justify-center shadow-sm">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Form */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Cupom de Desconto</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ex: ALLINONE10"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:border-indigo-500 font-bold"
                  />
                  <button onClick={applyCoupon} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Summary Values */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Resumo Financeiro</h4>
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">R$ {cartSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Frete</span>
                  <span className="font-bold text-emerald-600">Grátis</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Desconto</span>
                  <span className="font-bold text-indigo-600">- R$ {cartDiscountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
                  <span>Total</span>
                  <span className="text-indigo-600 text-base">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (cart.length === 0) {
                    showToast('Adicione produtos antes de comprar', 'info');
                    return;
                  }
                  showToast('Pedido realizado com sucesso!');
                  setCart([]);
                  setActiveScreen('home');
                }}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Finalizar Compra Segura</span>
              </button>
            </div>
          )}

          {/* ================= 7. TELA DE GERENCIAMENTO DE DISPOSITIVOS ================= */}
          {activeScreen === 'devices' && (
            <div className="p-4 pb-20 flex flex-col gap-4">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-base font-black text-slate-900">Dispositivos Conectados</h3>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    6 Dispositivos Online
                  </p>
                </div>
                <button onClick={() => showToast('Buscando novos robôs IoT...', 'info')} className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Room Filter Navigation */}
              <div className="flex rounded-xl bg-slate-200/80 p-1">
                {['cozinha', 'quarto', 'luz'].map((room) => (
                  <button
                    key={room}
                    onClick={() => setSelectedRoomTab(room)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                      selectedRoomTab === room ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {room === 'luz' ? 'Luzes RGB' : room}
                  </button>
                ))}
              </div>

              {/* COZINHA ROOM */}
              {selectedRoomTab === 'cozinha' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-xl relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                          Cozinha • Ativo
                        </span>
                        <h4 className="text-lg font-black mt-1">OmniBot Pro X1</h4>
                        <p className="text-xs text-indigo-300 font-medium">{vacuumState.status}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
                        <Battery className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{vacuumState.battery}%</span>
                      </div>
                    </div>

                    <div className="my-6 flex justify-center">
                      <div className={`w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-400/40 flex items-center justify-center ${vacuumState.active ? 'animate-pulse' : ''}`}>
                        <Bot className="w-12 h-12 text-indigo-300" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setVacuumState((prev) => ({
                            ...prev,
                            active: !prev.active,
                            status: !prev.active ? 'Executando Limpeza Automatizada' : 'Em Pausa / Aguardando Comando'
                          }));
                          showToast(vacuumState.active ? 'Robô pausado' : 'Robô iniciado');
                        }}
                        className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        {vacuumState.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{vacuumState.active ? 'Pausar' : 'Iniciar'}</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setVacuumState((prev) => ({
                            ...prev,
                            active: false,
                            status: 'Retornando à Base de Carregamento'
                          }));
                          showToast('Retornando à base...', 'info');
                        }}
                        className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Base</span>
                      </button>
                    </div>
                  </div>

                  {/* Suction Mode Selector */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <label className="block text-xs font-bold text-slate-900 mb-2">Poder de Sucção</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['Eco', 'Padrão', 'Turbo', 'Max'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => {
                            setVacuumState((prev) => ({ ...prev, suction: mode }));
                            showToast(`Sucção alterada para ${mode}`);
                          }}
                          className={`py-2 rounded-xl text-[10px] font-bold transition-all ${
                            vacuumState.suction === mode ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* QUARTO ROOM */}
              {selectedRoomTab === 'quarto' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                          <Wind className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">AirSentinel Purifier</h4>
                          <p className="text-[10px] text-slate-400 font-medium">Quarto Principal</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setPurifierActive(!purifierActive);
                          showToast(purifierActive ? 'Purificador desligado' : 'Purificador ligado');
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                          purifierActive ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${purifierActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>

                    <div className="bg-cyan-50/60 rounded-2xl p-4 border border-cyan-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider">Qualidade do Ar</span>
                        <div className="text-lg font-black text-cyan-900 mt-0.5">98% Excelente</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-md">
                        AQI 12
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LUZES ROOM */}
              {selectedRoomTab === 'luz' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
                          style={{
                            backgroundColor: lightState.active ? `${lightState.colorHex}20` : '#f1f5f9',
                            color: lightState.active ? lightState.colorHex : '#94a3b8'
                          }}
                        >
                          <Sun className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">LightSphere RGB Pro</h4>
                          <p className="text-[10px] text-slate-400 font-medium">Luz da Sala</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setLightState((prev) => ({ ...prev, active: !prev.active }));
                          showToast(lightState.active ? 'Luzes apagadas' : 'Luzes acesas');
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                          lightState.active ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${lightState.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>

                    {/* Brightness Slider */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Brilho</span>
                        <span>{lightState.brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lightState.brightness}
                        onChange={(e) => setLightState((prev) => ({ ...prev, brightness: e.target.value }))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    {/* Color Presets */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-2">Preset de Cores</span>
                      <div className="flex gap-2">
                        {[
                          { hex: '#f59e0b', name: 'Quente' },
                          { hex: '#3b82f6', name: 'Cyber' },
                          { hex: '#8b5cf6', name: 'Neon' },
                          { hex: '#10b981', name: 'Emerald' }
                        ].map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setLightState((prev) => ({ ...prev, colorHex: c.hex, colorName: c.name }))}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-transform hover:scale-105"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>

        {/* ================= FIXED BOTTOM NAVIGATION BAR ================= */}
        {activeScreen !== 'splash' && activeScreen !== 'auth' && (
          <nav className="w-full bg-white border-t border-slate-200 px-3 py-2.5 flex justify-around items-center shrink-0 z-40 shadow-lg">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center gap-0.5 ${activeScreen === 'home' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px] font-bold">Início</span>
            </button>

            <button
              onClick={() => setActiveScreen('details')}
              className={`flex flex-col items-center gap-0.5 ${activeScreen === 'details' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <Package className="w-4 h-4" />
              <span className="text-[10px] font-bold">Produto</span>
            </button>

            <button
              onClick={() => setActiveScreen('customizer')}
              className={`flex flex-col items-center gap-0.5 ${activeScreen === 'customizer' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <Sliders className="w-4 h-4" />
              <span className="text-[10px] font-bold">Customizar</span>
            </button>

            <button
              onClick={() => setActiveScreen('devices')}
              className={`flex flex-col items-center gap-0.5 ${activeScreen === 'devices' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-bold">IoT</span>
            </button>

            <button
              onClick={() => setActiveScreen('cart')}
              className={`flex flex-col items-center gap-0.5 relative ${activeScreen === 'cart' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartBadgeCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalCartBadgeCount}
                </span>
              )}
              <span className="text-[10px] font-bold">Carrinho</span>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}