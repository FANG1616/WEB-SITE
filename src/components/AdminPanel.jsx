import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  Crown, 
  Package, 
  Sliders, 
  Tag, 
  Check, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Key,
  ShieldCheck,
  Server,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { RANKS_DATA, CRATES_DATA, DEFAULT_SITE_CONFIG, DEFAULT_COUPONS } from '../data/storeData';

export function AdminPanel({
  isOpen,
  onClose,
  ranks,
  onUpdateRanks,
  crates,
  onUpdateCrates,
  siteConfig,
  onUpdateSiteConfig,
  coupons,
  onUpdateCoupons,
  recentOrders,
  onResetDefaults
}) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('ceylon_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('ceylon_admin_pin') || '1234';
  });
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);

  // Active admin tab
  const [activeAdminTab, setActiveAdminTab] = useState('ranks'); // 'overview', 'ranks', 'crates', 'site', 'coupons', 'orders'

  // Working local copies
  const [localRanks, setLocalRanks] = useState(ranks);
  const [localCrates, setLocalCrates] = useState(crates);
  const [localConfig, setLocalConfig] = useState(siteConfig);
  const [localCoupons, setLocalCoupons] = useState(coupons);

  // New coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('25');
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Notification
  const [saveSuccess, setSaveSuccess] = useState('');

  // Sync when props change or modal opens
  React.useEffect(() => {
    setLocalRanks(ranks);
    setLocalCrates(crates);
    setLocalConfig(siteConfig);
    setLocalCoupons(coupons);
  }, [ranks, crates, siteConfig, coupons, isOpen]);

  if (!isOpen) return null;

  const handlePinLogin = (e) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('ceylon_admin_auth', 'true');
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError('Incorrect Admin PIN. (Default is 1234)');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('ceylon_admin_auth');
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert('PIN must be at least 4 digits');
      return;
    }
    setAdminPin(newPin);
    localStorage.setItem('ceylon_admin_pin', newPin);
    setNewPin('');
    setShowPinChange(false);
    triggerSuccessNotification('Master Admin PIN successfully updated!');
  };

  const triggerSuccessNotification = (msg) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  // Rank edits
  const handleRankPriceChange = (rankId, field, val) => {
    const num = parseFloat(val) || 0;
    setLocalRanks(prev => prev.map(r => r.id === rankId ? { ...r, [field]: num } : r));
  };

  const handleRankFieldChange = (rankId, field, val) => {
    setLocalRanks(prev => prev.map(r => r.id === rankId ? { ...r, [field]: val } : r));
  };

  const handleToggleRankAvailability = (rankId) => {
    setLocalRanks(prev => prev.map(r => r.id === rankId ? { ...r, available: !r.available } : r));
  };

  // Crate edits
  const handleToggleCrateAvailability = (crateId) => {
    setLocalCrates(prev => prev.map(c => c.id === crateId ? { ...c, available: !c.available } : c));
  };

  const handleCrateKeyPriceChange = (crateId, count, newPrice) => {
    const num = parseFloat(newPrice) || 0;
    setLocalCrates(prev => prev.map(c => {
      if (c.id !== crateId) return c;
      const updatedTiers = c.keyTiers.map(tier => {
        if (tier.count === count) {
          return { ...tier, price: num };
        }
        return tier;
      });
      return { ...c, keyTiers: updatedTiers };
    }));
  };

  const handleCrateKeyTagChange = (crateId, count, newTag) => {
    setLocalCrates(prev => prev.map(c => {
      if (c.id !== crateId) return c;
      const updatedTiers = c.keyTiers.map(tier => {
        if (tier.count === count) {
          return { ...tier, tag: newTag };
        }
        return tier;
      });
      return { ...c, keyTiers: updatedTiers };
    }));
  };

  // Save all changes
  const handleSaveAll = () => {
    onUpdateRanks(localRanks);
    onUpdateCrates(localCrates);
    onUpdateSiteConfig(localConfig);
    onUpdateCoupons(localCoupons);
    triggerSuccessNotification('All Store Changes & Pricing saved successfully!');
  };

  // Add Coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const item = {
      id: `c_${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discount: parseInt(newCouponDiscount) || 10,
      active: true,
      desc: newCouponDesc.trim() || `${newCouponDiscount}% Discount`
    };
    setLocalCoupons(prev => [...prev, item]);
    setNewCouponCode('');
    setNewCouponDesc('');
    triggerSuccessNotification(`Coupon ${item.code} created!`);
  };

  const handleDeleteCoupon = (id) => {
    setLocalCoupons(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleCoupon = (id) => {
    setLocalCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to revert all ranks, crate prices, and site configurations to factory defaults?')) {
      onResetDefaults();
      setLocalRanks(RANKS_DATA);
      setLocalCrates(CRATES_DATA);
      setLocalConfig(DEFAULT_SITE_CONFIG);
      setLocalCoupons(DEFAULT_COUPONS);
      triggerSuccessNotification('Reset all store data to defaults!');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 3, 8, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #160e22 0%, #0d0815 100%)',
          border: '2px solid #ff2e93',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '1050px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0,0,0,0.95), 0 0 50px rgba(255, 46, 147, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 46, 147, 0.3)',
            background: 'rgba(255, 46, 147, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '10px', 
                background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 46, 147, 0.5)'
              }}
            >
              <Sliders size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Ceylon SMP Admin Control Panel
                </h3>
                <span 
                  style={{
                    background: isAdminAuthenticated ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: isAdminAuthenticated ? '#4ade80' : '#f87171',
                    border: `1px solid ${isAdminAuthenticated ? '#22c55e' : '#ef4444'}`,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}
                >
                  {isAdminAuthenticated ? 'AUTHENTICATED' : 'LOCKED'}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#ff75a0' }}>
                Control live store pricing, rank availability, crate keys, banners & coupons
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAdminAuthenticated && (
              <button
                onClick={handleSaveAll}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px' }}
              >
                <Save size={15} /> Save All Changes
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div 
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              borderBottom: '1px solid #22c55e',
              padding: '10px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#4ade80',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            <Check size={16} /> {saveSuccess}
          </div>
        )}

        {/* Content Area */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <form 
              onSubmit={handlePinLogin}
              style={{
                background: 'rgba(25, 17, 34, 0.8)',
                border: '1px solid rgba(255, 46, 147, 0.35)',
                borderRadius: '20px',
                padding: '36px',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}
            >
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255, 46, 147, 0.15)',
                  border: '2px solid #ff2e93',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff75a0',
                  marginBottom: '16px'
                }}
              >
                <Lock size={28} />
              </div>

              <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>
                Admin Authentication
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '20px' }}>
                Enter the master PIN to manage Ceylon SMP prices and server availability. (Default PIN: <strong style={{ color: '#ff75a0' }}>1234</strong>)
              </p>

              <input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                maxLength={8}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#0d0815',
                  border: '1px solid rgba(255, 46, 147, 0.4)',
                  color: '#fff',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  letterSpacing: '0.25em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '14px',
                  outline: 'none'
                }}
                autoFocus
              />

              {pinError && (
                <div style={{ color: '#f87171', fontSize: '0.78rem', marginBottom: '12px' }}>
                  {pinError}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', borderRadius: '10px' }}
              >
                <Unlock size={16} /> Authenticate Admin Access
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            
            {/* Sidebar Navigation */}
            <div 
              style={{
                width: '230px',
                borderRight: '1px solid rgba(255, 46, 147, 0.2)',
                background: 'rgba(12, 8, 18, 0.6)',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { id: 'ranks', label: 'Ranks Pricing & Avail.', icon: Crown },
                  { id: 'crates', label: 'Crates & Keys Pricing', icon: Package },
                  { id: 'site', label: 'Site & Banner Config', icon: Server },
                  { id: 'coupons', label: 'Coupon Codes', icon: Tag },
                  { id: 'orders', label: 'Store Orders Log', icon: ShoppingBag }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeAdminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAdminTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: isActive ? '1px solid #ff2e93' : '1px solid transparent',
                        background: isActive ? 'rgba(255, 46, 147, 0.2)' : 'transparent',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        fontWeight: isActive ? 800 : 500,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={16} style={{ color: isActive ? '#ff75a0' : '#64748b' }} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Tools */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setShowPinChange(!showPinChange)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  Change Admin PIN
                </button>

                <button
                  onClick={handleResetToDefaults}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={12} /> Reset to Defaults
                </button>

                <button
                  onClick={handleAdminLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  Lock / Logout
                </button>
              </div>
            </div>

            {/* Main Tab Panel Content */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              
              {/* Change PIN Modal Popup */}
              {showPinChange && (
                <div style={{ background: '#1c1328', border: '1px solid #ff2e93', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                  <h5 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '8px' }}>Set New Master Admin PIN:</h5>
                  <form onSubmit={handleChangePin} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="password"
                      placeholder="New PIN (min 4 digits)"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: '6px', background: '#0a0610', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Save PIN</button>
                    <button type="button" onClick={() => setShowPinChange(false)} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Cancel</button>
                  </form>
                </div>
              )}

              {/* TAB 1: RANKS PRICING & AVAILABILITY */}
              {activeAdminTab === 'ranks' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                        Ranks Pricing & Availability Control
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Modify pricing, discounts, and toggle on/off availability for any Ceylon SMP rank.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {localRanks.map((rank) => (
                      <div
                        key={rank.id}
                        style={{
                          background: rank.available ? 'rgba(25, 17, 34, 0.85)' : 'rgba(25, 17, 34, 0.4)',
                          border: `1px solid ${rank.available ? 'rgba(255, 46, 147, 0.3)' : 'rgba(100, 116, 139, 0.25)'}`,
                          borderRadius: '14px',
                          padding: '16px 20px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          opacity: rank.available ? 1 : 0.65
                        }}
                      >
                        {/* Rank Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '180px' }}>
                          <span
                            style={{
                              background: rank.tagColor,
                              color: rank.textColor || '#fff',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontWeight: 900,
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem'
                            }}
                          >
                            {rank.tag}
                          </span>
                          <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                              {rank.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#ff75a0' }}>
                              Tier #{rank.tier}
                            </div>
                          </div>
                        </div>

                        {/* Price & Original Price Inputs */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                              Store Price ($):
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={rank.price}
                              onChange={(e) => handleRankPriceChange(rank.id, 'price', e.target.value)}
                              style={{
                                width: '90px',
                                padding: '6px 8px',
                                background: '#0e0915',
                                border: '1px solid rgba(255, 46, 147, 0.4)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>
                              Original Price ($):
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={rank.originalPrice}
                              onChange={(e) => handleRankPriceChange(rank.id, 'originalPrice', e.target.value)}
                              style={{
                                width: '90px',
                                padding: '6px 8px',
                                background: '#0e0915',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                color: '#94a3b8',
                                fontSize: '0.85rem',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                              Discount Badge:
                            </label>
                            <input
                              type="text"
                              value={rank.discount}
                              onChange={(e) => handleRankFieldChange(rank.id, 'discount', e.target.value)}
                              style={{
                                width: '95px',
                                padding: '6px 8px',
                                background: '#0e0915',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                color: '#4ade80',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        {/* Availability Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleRankAvailability(rank.id)}
                            style={{
                              background: rank.available ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              border: `1px solid ${rank.available ? '#22c55e' : '#ef4444'}`,
                              color: rank.available ? '#4ade80' : '#f87171',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {rank.available ? <Eye size={14} /> : <EyeOff size={14} />}
                            <span>{rank.available ? 'In Stock (Active)' : 'Hidden (Disabled)'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CRATES & KEYS PRICING & AVAILABILITY */}
              {activeAdminTab === 'crates' && (
                <div>
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                      Crates & Crate Keys Pricing Control
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Configure price points for 1 Key, 5 Keys, 10 Keys, and 20 Keys for all crates.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {localCrates.map((crate) => (
                      <div
                        key={crate.id}
                        style={{
                          background: crate.available ? 'rgba(25, 17, 34, 0.85)' : 'rgba(25, 17, 34, 0.4)',
                          border: `1px solid ${crate.available ? crate.accentColor : 'rgba(100, 116, 139, 0.3)'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          opacity: crate.available ? 1 : 0.65
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: crate.accentColor }} />
                            <h5 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                              {crate.name}
                            </h5>
                            <span style={{ fontSize: '0.72rem', color: crate.accentColor, background: `${crate.accentColor}22`, padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                              {crate.tag}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleCrateAvailability(crate.id)}
                            style={{
                              background: crate.available ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              border: `1px solid ${crate.available ? '#22c55e' : '#ef4444'}`,
                              color: crate.available ? '#4ade80' : '#f87171',
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {crate.available ? <Eye size={13} /> : <EyeOff size={13} />}
                            <span>{crate.available ? 'Active in Store' : 'Hidden from Store'}</span>
                          </button>
                        </div>

                        {/* Keys Pricing Grid: 1 Key, 5 Keys, 10 Keys, 20 Keys */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                          {crate.keyTiers.map((tier) => (
                            <div
                              key={tier.count}
                              style={{
                                background: 'rgba(10, 6, 16, 0.7)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                padding: '12px'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.85rem' }}>
                                  {tier.count}x Keys:
                                </span>
                                <input
                                  type="text"
                                  value={tier.tag}
                                  onChange={(e) => handleCrateKeyTagChange(crate.id, tier.count, e.target.value)}
                                  placeholder="Tag"
                                  style={{
                                    width: '85px',
                                    padding: '2px 6px',
                                    background: '#150d20',
                                    border: '1px solid rgba(255, 46, 147, 0.25)',
                                    borderRadius: '4px',
                                    color: '#4ade80',
                                    fontSize: '0.68rem',
                                    textAlign: 'right'
                                  }}
                                />
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#ff75a0', fontWeight: 800 }}>$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={tier.price}
                                  onChange={(e) => handleCrateKeyPriceChange(crate.id, tier.count, e.target.value)}
                                  style={{
                                    width: '100%',
                                    padding: '6px',
                                    background: '#181024',
                                    border: '1px solid rgba(255, 46, 147, 0.4)',
                                    borderRadius: '6px',
                                    color: '#ffffff',
                                    fontWeight: 800,
                                    fontSize: '0.9rem'
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SITE & BANNER CONFIG */}
              {activeAdminTab === 'site' && (
                <div>
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                      Overall Site Branding & Announcement Settings
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Manage server display name, server IP address, sale announcement banner, and Discord widget ID.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
                          Minecraft Server Name:
                        </label>
                        <input
                          type="text"
                          value={localConfig.serverName}
                          onChange={(e) => setLocalConfig({ ...localConfig, serverName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: '#0d0815',
                            border: '1px solid rgba(255, 46, 147, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
                          Server IP Address (Copy Widget):
                        </label>
                        <input
                          type="text"
                          value={localConfig.serverIp}
                          onChange={(e) => setLocalConfig({ ...localConfig, serverIp: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: '#0d0815',
                            border: '1px solid rgba(255, 46, 147, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
                          Simulated Online Players Count:
                        </label>
                        <input
                          type="number"
                          value={localConfig.playersOnline}
                          onChange={(e) => setLocalConfig({ ...localConfig, playersOnline: parseInt(e.target.value) || 0 })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: '#0d0815',
                            border: '1px solid rgba(255, 46, 147, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
                          Discord Server Widget ID:
                        </label>
                        <input
                          type="text"
                          value={localConfig.discordWidgetId}
                          onChange={(e) => setLocalConfig({ ...localConfig, discordWidgetId: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: '#0d0815',
                            border: '1px solid rgba(255, 46, 147, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Sale Banner Settings */}
                    <div style={{ background: 'rgba(255, 46, 147, 0.08)', border: '1px solid rgba(255, 46, 147, 0.3)', borderRadius: '14px', padding: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                          Promotional Sale Banner Controls
                        </div>
                        <button
                          type="button"
                          onClick={() => setLocalConfig({ ...localConfig, saleBannerActive: !localConfig.saleBannerActive })}
                          style={{
                            background: localConfig.saleBannerActive ? '#22c55e' : '#475569',
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {localConfig.saleBannerActive ? 'Banner Visible' : 'Banner Hidden'}
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                            Banner Title Headline:
                          </label>
                          <input
                            type="text"
                            value={localConfig.saleTitle}
                            onChange={(e) => setLocalConfig({ ...localConfig, saleTitle: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              background: '#0a0610',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              color: '#fff',
                              fontSize: '0.85rem'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                            Banner Featured Coupon Code:
                          </label>
                          <input
                            type="text"
                            value={localConfig.saleCouponCode}
                            onChange={(e) => setLocalConfig({ ...localConfig, saleCouponCode: e.target.value.toUpperCase() })}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              background: '#0a0610',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              color: '#ff75a0',
                              fontWeight: 800,
                              fontSize: '0.85rem',
                              fontFamily: 'var(--font-mono)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: COUPON CODES */}
              {activeAdminTab === 'coupons' && (
                <div>
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                      Coupon Codes & Discounts Management
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Create new promotional vouchers or disable existing discount codes.
                    </div>
                  </div>

                  {/* Create New Coupon Form */}
                  <form 
                    onSubmit={handleAddCoupon}
                    style={{
                      background: 'rgba(255, 46, 147, 0.08)',
                      border: '1px dashed rgba(255, 46, 147, 0.4)',
                      borderRadius: '14px',
                      padding: '16px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      alignItems: 'flex-end',
                      marginBottom: '20px'
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#e2e8f0', fontWeight: 700, marginBottom: '4px' }}>
                        Promo Code:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. FLASH30"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        style={{
                          padding: '8px 10px',
                          background: '#0d0815',
                          border: '1px solid rgba(255, 46, 147, 0.4)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase'
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#e2e8f0', fontWeight: 700, marginBottom: '4px' }}>
                        Discount (%):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={newCouponDiscount}
                        onChange={(e) => setNewCouponDiscount(e.target.value)}
                        style={{
                          width: '80px',
                          padding: '8px 10px',
                          background: '#0d0815',
                          border: '1px solid rgba(255, 46, 147, 0.4)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#e2e8f0', fontWeight: 700, marginBottom: '4px' }}>
                        Description / Campaign Name:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Summer Weekend Flash Sale"
                        value={newCouponDesc}
                        onChange={(e) => setNewCouponDesc(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          background: '#0d0815',
                          border: '1px solid rgba(255, 46, 147, 0.4)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      <Plus size={15} /> Add Coupon
                    </button>
                  </form>

                  {/* Coupons List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {localCoupons.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          background: 'rgba(25, 17, 34, 0.75)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '12px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            style={{
                              background: 'rgba(255, 46, 147, 0.2)',
                              border: '1px solid #ff2e93',
                              color: '#ff75a0',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 800,
                              fontSize: '0.88rem'
                            }}
                          >
                            {c.code}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                              {c.discount}% Discount
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                              {c.desc}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleCoupon(c.id)}
                            style={{
                              background: c.active ? 'rgba(34, 197, 94, 0.15)' : 'rgba(100, 116, 139, 0.2)',
                              border: `1px solid ${c.active ? '#22c55e' : '#64748b'}`,
                              color: c.active ? '#4ade80' : '#94a3b8',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {c.active ? 'Enabled' : 'Disabled'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCoupon(c.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#f87171',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ORDERS LOG */}
              {activeAdminTab === 'orders' && (
                <div>
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                      Customer Purchases & Orders History
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Simulated and live transactions placed through the Ceylon SMP store.
                    </div>
                  </div>

                  {(!recentOrders || recentOrders.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px' }}>
                      <ShoppingBag size={32} style={{ color: '#64748b', marginBottom: '8px' }} />
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No orders placed yet in this session.</div>
                      <div style={{ color: '#64748b', fontSize: '0.78rem' }}>When players checkout from the cart, their receipt will appear here live.</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {recentOrders.map((ord, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(25, 17, 34, 0.75)',
                            border: '1px solid rgba(255, 46, 147, 0.2)',
                            borderRadius: '12px',
                            padding: '14px 18px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#ff75a0', fontSize: '0.85rem' }}>
                                {ord.orderId}
                              </span>
                              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>• {ord.date}</span>
                              <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                Delivered
                              </span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                              Target Player: <strong style={{ color: '#86efac' }}>{ord.targetPlayer}</strong> ({ord.googleAccount})
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                              Items: {ord.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>
                              {ord.currencySymbol}{ord.total}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#ff75a0', textTransform: 'capitalize' }}>
                              via {ord.paymentMethod}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
