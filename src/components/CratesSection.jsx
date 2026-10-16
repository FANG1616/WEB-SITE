import React, { useState } from 'react';
import { 
  Package, 
  Key, 
  Sparkles, 
  ShoppingCart, 
  Eye, 
  Dices, 
  ShieldCheck, 
  Gift,
  Check
} from 'lucide-react';
import { CRATES_DATA, CURRENCIES } from '../data/storeData';

export function CratesSection({ 
  crates = CRATES_DATA,
  selectedCurrency, 
  onAddToCart, 
  onOpenLootPreview, 
  onOpenSpinSimulator 
}) {
  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const availableCrates = crates.filter(c => c.available !== false);

  // Selected key tier state for each crate: default to 5 keys or 10 keys
  const [selectedKeys, setSelectedKeys] = useState({
    advanced: 10,
    cosmic: 5,
    casino: 5,
    wander: 10
  });

  const handleKeyTierSelect = (crateId, count) => {
    setSelectedKeys(prev => ({ ...prev, [crateId]: count }));
  };

  return (
    <section id="crates" style={{ padding: '40px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 
          style={{ 
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.02em', 
            color: '#ffffff',
            marginBottom: '8px' 
          }}
        >
          Crates & <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ff75a0 50%, #ff2e93 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Crate Keys</span>
        </h2>
      </div>

      {/* Crates Grid: High to Low (Advanced -> Cosmic -> Casino -> Wander) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {availableCrates.map((crate) => {
          const currentCount = selectedKeys[crate.id] || 1;
          const activeTier = crate.keyTiers.find(t => t.count === currentCount) || crate.keyTiers[0];
          const priceConverted = (activeTier.price * curr.rate).toFixed(2);
          const origConverted = (activeTier.originalPrice * curr.rate).toFixed(2);
          const isTopTier = crate.id === 'advanced';

          return (
            <div
              key={crate.id}
              style={{
                position: 'relative',
                background: crate.bgGradient,
                border: isTopTier ? '2px solid #ff2e93' : `1px solid ${crate.borderColor}`,
                borderRadius: '22px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isTopTier 
                  ? '0 12px 36px rgba(255, 46, 147, 0.35)' 
                  : '0 8px 24px rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(12px)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      background: 'rgba(255, 46, 147, 0.2)',
                      border: `1px solid ${crate.accentColor}`,
                      color: '#ffffff',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {crate.tag}
                  </span>

                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ff99cc',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}
                  >
                    {crate.badge}
                  </span>
                </div>

                {/* 3D Visual Crate Icon */}
                <div style={{ textAlign: 'center', margin: '14px 0' }}>
                  <div 
                    style={{
                      width: '84px',
                      height: '84px',
                      margin: '0 auto',
                      borderRadius: '20px',
                      background: `radial-gradient(circle at 35% 35%, ${crate.accentColor} 0%, #150c1f 85%)`,
                      border: `2px solid ${crate.accentColor}`,
                      boxShadow: `0 0 25px ${crate.accentColor}66`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    className="animate-float"
                  >
                    <Package size={42} style={{ color: '#ffffff', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }} />
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        right: '-6px',
                        background: '#0a0610',
                        border: `1px solid ${crate.accentColor}`,
                        borderRadius: '50%',
                        padding: '4px',
                        display: 'flex'
                      }}
                    >
                      <Key size={14} style={{ color: crate.accentColor }} />
                    </span>
                  </div>
                </div>

                {/* Crate Name & Description */}
                <h3 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 900, 
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '6px'
                  }}
                >
                  {crate.name}
                </h3>
                <p 
                  style={{ 
                    fontSize: '0.82rem', 
                    color: '#cbd5e1', 
                    textAlign: 'center', 
                    minHeight: '40px',
                    lineHeight: 1.4,
                    marginBottom: '18px' 
                  }}
                >
                  {crate.description}
                </p>

                {/* Requirement: Key selector options: 1 key, 5 keys, 10 keys, 20 keys */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f472b6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Key size={13} /> Select Key Amount:
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700 }}>
                      {activeTier.tag}
                    </span>
                  </div>

                  {/* 1 key, 5 keys, 10 keys, 20 keys buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {crate.keyTiers.map((tier) => {
                      const isSelected = tier.count === currentCount;
                      return (
                        <button
                          key={tier.count}
                          type="button"
                          onClick={() => handleKeyTierSelect(crate.id, tier.count)}
                          style={{
                            background: isSelected ? 'linear-gradient(135deg, #ff2e93 0%, #db2777 100%)' : 'rgba(255, 255, 255, 0.05)',
                            border: isSelected ? '1px solid #ff75a0' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '8px 4px',
                            color: isSelected ? '#ffffff' : '#cbd5e1',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                            boxShadow: isSelected ? '0 0 12px rgba(255, 46, 147, 0.5)' : 'none'
                          }}
                        >
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>
                            {tier.count}x
                          </div>
                          <div style={{ fontSize: '0.62rem', opacity: 0.85 }}>
                            {tier.count === 1 ? 'Key' : 'Keys'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Price Display */}
                <div 
                  style={{
                    background: 'rgba(10, 6, 15, 0.65)',
                    border: '1px solid rgba(255, 46, 147, 0.25)',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                      Total for {currentCount}x {crate.name} Keys:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
                        {curr.symbol}{priceConverted}
                      </span>
                      {activeTier.price < activeTier.originalPrice && (
                        <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                          {curr.symbol}{origConverted}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        color: '#ff75a0', 
                        fontWeight: 700,
                        background: 'rgba(255, 46, 147, 0.15)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {curr.symbol}{((activeTier.price / activeTier.count) * curr.rate).toFixed(2)}/key
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => onAddToCart({
                    id: `crate-${crate.id}-${currentCount}`,
                    name: `${crate.name} (${currentCount}x Keys)`,
                    type: 'crate',
                    crateId: crate.id,
                    keysCount: currentCount,
                    price: activeTier.price,
                    image: '/ceylon-logo.jpg',
                    color: crate.accentColor,
                    tag: `${currentCount}x Keys`
                  })}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '11px',
                    fontSize: '0.88rem',
                    borderRadius: '10px'
                  }}
                >
                  <ShoppingCart size={16} />
                  <span>Add {currentCount}x Keys to Cart</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onOpenLootPreview(crate)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={13} style={{ color: '#38bdf8' }} /> Preview Loot
                  </button>

                  <button
                    onClick={() => onOpenSpinSimulator(crate)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 46, 147, 0.15)',
                      border: '1px solid rgba(255, 46, 147, 0.35)',
                      color: '#ff99cc',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Dices size={13} /> Test Spin
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
