import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BannerSale } from './components/BannerSale';
import { RanksSection } from './components/RanksSection';
import { CratesSection } from './components/CratesSection';
import { DiscordSection } from './components/DiscordSection';
import { Footer } from './components/Footer';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { MinecraftModal } from './components/MinecraftModal';
import { CartModal } from './components/CartModal';
import { RankDetailModal } from './components/RankDetailModal';
import { LootPreviewModal } from './components/LootPreviewModal';
import { CrateSpinModal } from './components/CrateSpinModal';
import { AdminPanel } from './components/AdminPanel';
import { CheckCircle2, ShoppingCart, MessageSquare, Sparkles, Sliders, AlertTriangle } from 'lucide-react';
import { RANKS_DATA, CRATES_DATA, DEFAULT_SITE_CONFIG, DEFAULT_COUPONS } from './data/storeData';
import './App.css';

function App() {
  // Store dynamic ranks (pricing, availability, perks)
  const [ranks, setRanks] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_ranks');
      return saved ? JSON.parse(saved) : RANKS_DATA;
    } catch (e) {
      return RANKS_DATA;
    }
  });

  // Store dynamic crates (pricing, key options, availability)
  const [crates, setCrates] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_crates');
      return saved ? JSON.parse(saved) : CRATES_DATA;
    } catch (e) {
      return CRATES_DATA;
    }
  });

  // Store site configuration (server name, IP, online players, sale banner)
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_config');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
    } catch (e) {
      return DEFAULT_SITE_CONFIG;
    }
  });

  // Store promo coupons
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_coupons');
      return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
    } catch (e) {
      return DEFAULT_COUPONS;
    }
  });

  // Store recent orders for admin log
  const [recentOrders, setRecentOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Google account state persisted in localStorage
  const [googleUser, setGoogleUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylon_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Minecraft username persisted in localStorage
  const [minecraftUsername, setMinecraftUsername] = useState(() => {
    try {
      return localStorage.getItem('ceylon_mc_ign') || 'CeylonCrafter';
    } catch (e) {
      return 'CeylonCrafter';
    }
  });

  // Currency
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Navigation tab
  const [activeTab, setActiveTab] = useState('all');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);
  const [isMinecraftModalOpen, setIsMinecraftModalOpen] = useState(false);
  const [selectedRankDetail, setSelectedRankDetail] = useState(null);
  const [selectedLootPreview, setSelectedLootPreview] = useState(null);
  const [selectedSpinSimulator, setSelectedSpinSimulator] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState('');

  // Persist ranks
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_ranks', JSON.stringify(ranks));
    } catch (e) {
      // ignore
    }
  }, [ranks]);

  // Persist crates
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_crates', JSON.stringify(crates));
    } catch (e) {
      // ignore
    }
  }, [crates]);

  // Persist site config
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_config', JSON.stringify(siteConfig));
    } catch (e) {
      // ignore
    }
  }, [siteConfig]);

  // Persist coupons
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_coupons', JSON.stringify(coupons));
    } catch (e) {
      // ignore
    }
  }, [coupons]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_orders', JSON.stringify(recentOrders));
    } catch (e) {
      // ignore
    }
  }, [recentOrders]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Persist Google User
  useEffect(() => {
    try {
      if (googleUser) {
        localStorage.setItem('ceylon_google_user', JSON.stringify(googleUser));
      } else {
        localStorage.removeItem('ceylon_google_user');
      }
    } catch (e) {
      // ignore
    }
  }, [googleUser]);

  // Persist Minecraft username
  useEffect(() => {
    try {
      localStorage.setItem('ceylon_mc_ign', minecraftUsername);
    } catch (e) {
      // ignore
    }
  }, [minecraftUsername]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your cart!`);
  };

  const handleBuyNow = (item) => {
    handleAddToCart(item);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder) => {
    setRecentOrders(prev => [newOrder, ...prev]);
  };

  // Google sign in success
  const handleGoogleSignInSuccess = (user) => {
    setGoogleUser(user);
    if (user.linkedIgn) {
      setMinecraftUsername(user.linkedIgn);
    }
    showToast(`Signed in from your account: ${user.name}`);
  };

  const handleSignOut = () => {
    setGoogleUser(null);
    showToast('Signed out of Google account.');
  };

  // Reset all to defaults
  const handleResetDefaults = () => {
    localStorage.removeItem('ceylon_ranks');
    localStorage.removeItem('ceylon_crates');
    localStorage.removeItem('ceylon_config');
    localStorage.removeItem('ceylon_coupons');
    setRanks(RANKS_DATA);
    setCrates(CRATES_DATA);
    setSiteConfig(DEFAULT_SITE_CONFIG);
    setCoupons(DEFAULT_COUPONS);
    showToast('Reverted all store items & prices to defaults!');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative' }}>
      
      {/* Maintenance Mode Notice if active */}
      {siteConfig?.maintenanceMode && (
        <div 
          style={{
            background: 'linear-gradient(90deg, #b91c1c 0%, #991b1b 100%)',
            color: '#fff',
            padding: '8px 20px',
            textAlign: 'center',
            fontSize: '0.82rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.04em'
          }}
        >
          <AlertTriangle size={16} />
          <span>STORE MAINTENANCE MODE ACTIVE (Admin Previews Only)</span>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #1f1227 0%, #100b16 100%)',
            border: '1px solid #ff2e93',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(255, 46, 147, 0.4)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.88rem',
            fontWeight: 700,
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
        googleUser={googleUser}
        onSignOut={handleSignOut}
        minecraftUsername={minecraftUsername}
        onOpenMinecraftModal={() => setIsMinecraftModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        siteConfig={siteConfig}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Grand Hero Section with Transparent Minecraft Cherry Blossom Backdrop */}
        {(activeTab === 'all' || activeTab === 'home') && (
          <HeroSection
            siteConfig={siteConfig}
            onNavigateRanks={() => {
              setActiveTab('ranks');
              const el = document.getElementById('ranks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onNavigateCrates={() => {
              setActiveTab('crates');
              const el = document.getElementById('crates');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenMinecraftModal={() => setIsMinecraftModalOpen(true)}
            minecraftUsername={minecraftUsername}
          />
        )}

        {/* Banner sale event with timer */}
        <BannerSale 
          siteConfig={siteConfig}
          onExploreClick={() => {
            const el = document.getElementById('ranks');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Ranks Section: God down to Noob (Dynamic Admin Controlled) */}
        {(activeTab === 'all' || activeTab === 'ranks') && (
          <RanksSection
            ranks={ranks}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenRankDetail={(rank) => setSelectedRankDetail(rank)}
          />
        )}

        {/* Crates Section: Advanced, Cosmic, Casino, Wander (Dynamic Admin Controlled) */}
        {(activeTab === 'all' || activeTab === 'crates') && (
          <CratesSection
            crates={crates}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            onOpenLootPreview={(crate) => setSelectedLootPreview(crate)}
            onOpenSpinSimulator={(crate) => setSelectedSpinSimulator(crate)}
          />
        )}

        {/* Discord Section (with user requested iframe widget & dynamic widget ID) */}
        {(activeTab === 'all' || activeTab === 'discord') && (
          <DiscordSection siteConfig={siteConfig} />
        )}
      </main>

      {/* Footer with Hypixel-style notices, payment badges, server IP, and Admin button */}
      <Footer 
        siteConfig={siteConfig}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onCopyIp={() => showToast(`Server IP copied: ${siteConfig?.serverIp || 'play.ceylonsmp.net'}`)}
      />

      {/* Floating Discord Trigger Widget */}
      <a
        href="#discord"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('all');
          setTimeout(() => {
            const el = document.getElementById('discord');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        title="Ceylon SMP Discord Server"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(88, 101, 242, 0.45)',
          zIndex: 90,
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <MessageSquare size={18} />
        <span className="hidden-mobile">Ceylon Discord</span>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
      </a>

      {/* Modals */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        ranks={ranks}
        onUpdateRanks={(updated) => {
          setRanks(updated);
          showToast('Updated Ranks pricing & availability!');
        }}
        crates={crates}
        onUpdateCrates={(updated) => {
          setCrates(updated);
          showToast('Updated Crates & Keys pricing!');
        }}
        siteConfig={siteConfig}
        onUpdateSiteConfig={(updated) => {
          setSiteConfig(updated);
          showToast('Updated Site settings!');
        }}
        coupons={coupons}
        onUpdateCoupons={(updated) => {
          setCoupons(updated);
          showToast('Updated Coupon codes!');
        }}
        recentOrders={recentOrders}
        onResetDefaults={handleResetDefaults}
      />

      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
        onSignInSuccess={handleGoogleSignInSuccess}
        currentMinecraftUser={minecraftUsername}
      />

      <MinecraftModal
        isOpen={isMinecraftModalOpen}
        onClose={() => setIsMinecraftModalOpen(false)}
        currentUsername={minecraftUsername}
        onSaveUsername={(name) => {
          setMinecraftUsername(name);
          showToast(`Linked Minecraft Player: ${name}`);
        }}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedCurrency={selectedCurrency}
        minecraftUsername={minecraftUsername}
        onOpenMinecraftModal={() => setIsMinecraftModalOpen(true)}
        googleUser={googleUser}
        onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
        coupons={coupons}
        onOrderPlaced={handleOrderPlaced}
      />

      <RankDetailModal
        isOpen={!!selectedRankDetail}
        onClose={() => setSelectedRankDetail(null)}
        rank={selectedRankDetail}
        selectedCurrency={selectedCurrency}
        onAddToCart={handleAddToCart}
      />

      <LootPreviewModal
        isOpen={!!selectedLootPreview}
        onClose={() => setSelectedLootPreview(null)}
        crate={selectedLootPreview}
      />

      <CrateSpinModal
        isOpen={!!selectedSpinSimulator}
        onClose={() => setSelectedSpinSimulator(null)}
        crate={selectedSpinSimulator}
      />
    </div>
  );
}

export default App;
