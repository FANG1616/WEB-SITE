import React, { useState } from 'react';
import { 
  ShoppingCart, 
  ChevronDown, 
  LogOut, 
  User, 
  Sparkles,
  Gamepad2,
  Sliders,
  Lock
} from 'lucide-react';
import { CURRENCIES } from '../data/storeData';

export function Navbar({ 
  cartCount, 
  cartTotal, 
  selectedCurrency, 
  setSelectedCurrency, 
  onOpenCart, 
  onOpenGoogleAuth, 
  googleUser, 
  onSignOut,
  minecraftUsername,
  onOpenMinecraftModal,
  activeTab,
  setActiveTab,
  siteConfig,
  onOpenAdmin
}) {
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const serverName = siteConfig?.serverName || 'Ceylon SMP';
  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

  return (
    <header className="sticky top-0 z-50 w-full" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Main Clean Navigation Bar without top micro-bar */}
      <nav
        style={{
          background: 'rgba(15, 11, 22, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 46, 147, 0.22)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            onClick={() => setActiveTab('all')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <div 
              style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 0 16px rgba(255, 46, 147, 0.5)',
                border: '2px solid #ff2e93'
              }}
            >
              <img 
                src="/ceylon-logo.jpg" 
                alt="Ceylon SMP Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900, 
                    fontSize: '1.4rem', 
                    letterSpacing: '0.04em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ff99cc 50%, #ff2e93 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textTransform: 'uppercase'
                  }}
                >
                  {serverName}
                </span>
                <span 
                  style={{
                    background: 'rgba(255, 46, 147, 0.2)',
                    border: '1px solid #ff2e93',
                    color: '#ff75a0',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  Store
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.02em' }}>
                Official Minecraft Network Store
              </div>
            </div>
          </div>

          {/* Navigation Links (Payment Methods removed) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              marginLeft: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
            className="hidden-mobile"
          >
            {[
              { id: 'all', label: 'Store Home' },
              { id: 'ranks', label: 'Ranks (God - Noob)' },
              { id: 'crates', label: 'Crates & Keys' },
              { id: 'discord', label: 'Discord Community' }
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: active ? 'linear-gradient(135deg, rgba(255, 46, 147, 0.35) 0%, rgba(219, 39, 119, 0.2) 100%)' : 'transparent',
                    border: active ? '1px solid rgba(255, 46, 147, 0.5)' : '1px solid transparent',
                    color: active ? '#ffffff' : '#94a3b8',
                    padding: '6px 14px',
                    borderRadius: '7px',
                    fontSize: '0.85rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 2px 10px rgba(255, 46, 147, 0.25)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side controls: Admin, Currency, Minecraft IGN, Google Account, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Admin Control Button */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'rgba(255, 46, 147, 0.15)',
              border: '1px solid rgba(255, 46, 147, 0.4)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#ff75a0',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Open Admin Control Panel"
          >
            <Sliders size={14} />
            <span className="hidden-mobile">Admin</span>
          </button>

          {/* Currency Dropdown Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px 10px',
                color: '#f8fafc',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              <span>{selectedCurrency} ({curr.symbol})</span>
              <ChevronDown size={13} />
            </button>

            {showCurrencyMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '6px',
                  background: '#1a1024',
                  border: '1px solid rgba(255, 46, 147, 0.35)',
                  borderRadius: '10px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.85)',
                  zIndex: 200,
                  minWidth: '130px',
                  overflow: 'hidden'
                }}
              >
                {Object.entries(CURRENCIES).map(([code, item]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setSelectedCurrency(code);
                      setShowCurrencyMenu(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '9px 12px',
                      background: selectedCurrency === code ? 'rgba(255, 46, 147, 0.25)' : 'transparent',
                      color: selectedCurrency === code ? '#ff75a0' : '#e2e8f0',
                      fontSize: '0.8rem',
                      fontWeight: selectedCurrency === code ? 700 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(255,255,255,0.04)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Minecraft IGN pill */}
          <button
            onClick={onOpenMinecraftModal}
            title="Link Minecraft In-Game Name"
            style={{
              background: minecraftUsername ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.05)',
              border: minecraftUsername ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#f8fafc',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {minecraftUsername ? (
              <>
                <img 
                  src={`https://mc-heads.net/avatar/${minecraftUsername}/24`} 
                  alt={minecraftUsername}
                  onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/24'; }}
                  style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                />
                <span style={{ color: '#86efac' }}>{minecraftUsername}</span>
              </>
            ) : (
              <>
                <Gamepad2 size={16} style={{ color: '#ff75a0' }} />
                <span>Link Player IGN</span>
              </>
            )}
          </button>

          {/* Google Sign In / Account Display */}
          {googleUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.15) 0%, rgba(26, 18, 34, 0.8) 100%)',
                  border: '1px solid rgba(255, 46, 147, 0.4)',
                  borderRadius: '9999px',
                  padding: '5px 14px 5px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(255, 46, 147, 0.2)'
                }}
              >
                <img 
                  src={googleUser.photo || 'https://lh3.googleusercontent.com/a/default-user'} 
                  alt={googleUser.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ff2e93' }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.65rem', color: '#ff99cc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Signed in from your account
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>
                    {googleUser.name}
                  </div>
                </div>
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    background: '#170f20',
                    border: '1px solid rgba(255, 46, 147, 0.4)',
                    borderRadius: '12px',
                    padding: '12px',
                    width: '260px',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.85)',
                    zIndex: 200
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <img 
                      src={googleUser.photo} 
                      alt="" 
                      style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #ff2e93' }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {googleUser.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {googleUser.email}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#ff75a0', marginTop: '2px', fontWeight: 600 }}>
                        ✓ Google Verified
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '10px', background: 'rgba(255, 46, 147, 0.08)', padding: '8px', borderRadius: '8px', border: '1px dashed rgba(255, 46, 147, 0.3)' }}>
                    <div style={{ fontWeight: 600, color: '#f472b6', marginBottom: '2px' }}>
                      Linked Minecraft IGN:
                    </div>
                    <div>{minecraftUsername || 'Not linked yet (click IGN above)'}</div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onSignOut();
                    }}
                    style={{
                      width: '100%',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={14} /> Sign out of account
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Sign in with Google Button */
            <button
              onClick={onOpenGoogleAuth}
              style={{
                background: '#ffffff',
                color: '#1f2937',
                border: 'none',
                borderRadius: '9999px',
                padding: '7px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            style={{
              background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)',
              border: 'none',
              borderRadius: '9999px',
              padding: '7px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 46, 147, 0.4)',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#ffffff',
                  color: '#ff2e93',
                  borderRadius: '9999px',
                  padding: '1px 7px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginLeft: '2px'
                }}
              >
                {cartCount}
              </span>
            )}
            <span style={{ opacity: 0.85, fontSize: '0.78rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
              {curr.symbol}{(cartTotal * curr.rate).toFixed(2)}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
